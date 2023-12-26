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
  setChanceHistory,
  chanceHistory
}) {
  const predict = useSelector((state) => state.predict);
  const [predictData, setPredictData] = useState<any>({});
  const [answer, setAnswer] = useState("");
  const [prevCounterQuestion, setPrevCounterQuestion] = useState<any[]>([]);
  const [testValue, setTestValue] = useState("");
  const [questionCounter, setQuestionCounter] = useState<any>(1);
  const [activeButton, setActiveButton] = useState<any>("");

  const dispatch = useDispatch();

  const handleChange = (value, type) => {
    if (type === "number") {
      setAnswer(Number(value));
    } else {
      setAnswer(value);
    }
  };

  const handleSubmit = async () => {
    console.log(answer);

    const newState: any = [];
    let keep = false;

    const filteredData = {
      ...predictData,
      [questions[currentQuestionIndex].question_value]:
        questions[currentQuestionIndex].type === "number"
          ? Number(answer)
          : questions[currentQuestionIndex].answer.value_en[answer],
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

        setChanceHistory((prev) => [
          ...prev,
          {
            question: questions[currentQuestionIndex].question_value,
            answer: answer,
            chance: Math.round(Number(resp.data.result) * 100),
          },
        ]);

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
                setQuestionCounter((prev) => prev + 1);
                setActiveButton("");
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

  console.log(chanceHistory);

  return (
    <>
      {answerPopup && (
        <div onClick={() => setAnswerPopup(false)} className={styles.closePopupLayout}></div>
      )}
      <div className={answerPopup ? styles.answerPopup : styles.answerPopupNot}>
        <div className={styles.answerPopupQuestion}>
          <p>{questionCounter}</p>
          <p>{questions[currentQuestionIndex].question}</p>
        </div>
        <div className={styles.answerPopupChioces}>
          {questions[currentQuestionIndex].type === "radio" ? (
            questions[currentQuestionIndex].answer.value_fa.map((item, index) => (
              <button
                className={activeButton == index && styles.activeButton}
                key={index}
                onClick={() => {
                  handleChange(index);
                  setActiveButton(index);
                }}
              >
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
          ) : questions[currentQuestionIndex].type === "number" ? (
            <div className={styles.questionNumber}>
              <button onClick={() => setAnswer((prevValue) => Number(prevValue + 1))}>+</button>
              <input
                type="number"
                min={questions[currentQuestionIndex].answer.value_fa[0]}
                max={questions[currentQuestionIndex].answer.value_fa[1]}
                value={answer}
                defaultValue={questions[currentQuestionIndex].answer.value_fa[0]}
                onChange={(event) => handleChange(event.target.value, "number")}
              />
              <button onClick={() => setAnswer((prevValue) => Number(prevValue - 1))}>-</button>
            </div>
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
