import { useState } from "react";
import styles from "./AnswerPopup.module.css";
import { questions } from "@/utils/QuestionJson";
import CallApi from "@/utils/CallApi";
import { useDispatch, useSelector } from "react-redux";
import {
  addCountQuestion,
  addCounterQuestionIndex,
  setChanceData,
  setCountAnswer,
  setGroupedXai,
  setNextPredictBackup,
  setNextPredictData,
  setPotentialData,
} from "@/store/features/predictSlice";
import { setToFinished } from "@/store/features/sliderSlice";

export default function AnswerPopup({
  answerPopup,
  setAnswerPopup,
  currentQuestionIndex,
  setCurrentQuestionIndex,
}) {
  const predict = useSelector((state) => state.predict);
  const [predictData, setPredictData] = useState<any>({});
  const [answer, setAnswer] = useState("");
  const [prevCounterQuestion, setPrevCounterQuestion] = useState<any[]>([]);
  const [testValue, setTestValue] = useState("");
  const [questionCounter, setQuestionCounter] = useState<any>(0);
  const [activeButton, setActiveButton] = useState<any>(0);

  const dispatch = useDispatch();

  const handleChange = (value) => {
    console.log(value);
    setAnswer(value);
  };

  const handleSubmit = async () => {
    console.log(answer);
    console.log(questions[currentQuestionIndex].answer.value_en[answer]);

    const newState: any = [];
    let keep = false;

    const filteredData = {
      ...predictData,
      [questions[currentQuestionIndex].question_value]:
        questions[currentQuestionIndex].answer.value_en[answer],
    };
    const filteredDataTest: any = [];

    console.log(filteredData);

    await CallApi.post("/predict", filteredData)
      .then(async (resp) => {
        // if answer all questions goes finish slider
        if (!resp.data.next_variable) {
          // dispatch(setToFinished());
        }
        console.log(resp.data.next_variable);
        console.log(
          questions.findIndex((question) => question.question_value === resp.data.next_variable)
        );
        setCurrentQuestionIndex(
          questions.findIndex((question) => question.question_value === resp.data.next_variable)
        );
        dispatch(setChanceData({ chance: resp.data.result }));
        dispatch(setNextPredictData({ nextVariable: resp.data.next_variable }));
        dispatch(setNextPredictBackup({ nextVariable: resp.data.next_variable }));
        setNextPredictData({ ...predictData, [resp.data.next_variable]: "" });
        setPredictData(filteredData);

        await CallApi.post("/grouped_xai", filteredData)
          .then(async (resp) => {
            dispatch(setGroupedXai({ data: resp.data }));

            await CallApi.post("/potential", filteredData)
              .then(async (response) => {
                dispatch(setPotentialData(response.data.result));
                if (predict.countAnswer === 1) {
                  dispatch(addCounterQuestionIndex({ payload: "" }));
                  setPrevCounterQuestion([
                    {
                      type: "sex",
                      questionIndex: 0,
                      chance: Math.round(Number(resp.data.result) * 100),
                      chartValues: predict.chartDataValues,
                      countAnswer: predict.countAnswer,
                      answer: testValue,
                      activeButton: activeButton,
                      potential: Math.round(Number(response.data.result) * 100),
                    },
                  ]);
                } else {
                  dispatch(addCounterQuestionIndex({ change: true }));
                  setPrevCounterQuestion([
                    ...prevCounterQuestion,
                    {
                      type: predict.nextPredict,
                      questionIndex: predict.questionIndex,
                      chance: Math.round(Number(resp.data.result) * 100),
                      chartValues: predict.chartDataValues,
                      countAnswer: predict.countAnswer,
                      answer: testValue,
                      activeButton: activeButton,
                      potential: Math.round(Number(response.data.result) * 100),
                    },
                  ]);
                }
              })
              .catch((error) => {
                console.log(error);
              });
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        // if (error.response.data.detail.includes("max")) {
        //   dispatch(setToFinished());
        // }
        console.log(error);
      });
  };

  return (
    <>
      {answerPopup && (
        <div onClick={() => setAnswerPopup(false)} className={styles.closePopupLayout}></div>
      )}
      <div className={answerPopup ? styles.answerPopup : styles.answerPopupNot}>
        <div className={`${styles.footerTopChance} ${answerPopup ? styles.stickyOnTop : ""} `}>
          <p>شناخت ویزارد از شما</p>
          <p>0%</p>
        </div>
        <div className={styles.answerPopupQuestion}>
          <p>{currentQuestionIndex + 1}</p>
          <p>{questions[currentQuestionIndex].question}</p>
        </div>
        <div className={styles.answerPopupChioces}>
          {questions[currentQuestionIndex].type === "radio" ? (
            questions[currentQuestionIndex].answer.value_fa.map((item, index) => (
              <button key={index} onClick={() => handleChange(index)}>
                {item}
              </button>
            ))
          ) : questions[currentQuestionIndex].type === "dropdown" ? (
            <select onChange={(event) => handleChange(event.target.value)}>
              {questions[currentQuestionIndex].answer.value_fa.map((item, index) => (
                <option key={index} value={index}>
                  {item}
                </option>
              ))}
            </select>
          ) : (
            ""
          )}
        </div>
        <button onClick={handleSubmit} className={styles.answerPopupSubmitButton}>
          ثبت پاسخ <img src="forward-arrow.svg" alt="arrow-forward" />
        </button>
      </div>
    </>
  );
}
