import { useEffect, useState } from "react";
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
import Loading from "../Loading";
import { SliderState } from "@/constants";

export default function AnswerPopup({
  answerPopup,
  setAnswerPopup,
  currentQuestionIndex,
  setCurrentQuestionIndex,
  setChanceHistory,
  chanceHistory,
  questionCounter,
  setQuestionCounter,
}) {
  const predict = useSelector((state) => state.predict);
  const slider = useSelector((state) => state.slider);
  const [predictData, setPredictData] = useState<any>({});
  const [answer, setAnswer] = useState(null);
  const [prevCounterQuestion, setPrevCounterQuestion] = useState<any[]>([]);
  const [testValue, setTestValue] = useState("");
  const [activeButton, setActiveButton] = useState<any>("");
  const [loading, setLoading] = useState(false);

  console.log(prevCounterQuestion);

  const dispatch = useDispatch();

  const handleChange = (value, type) => {
    console.log(type);
    if (type === "number") {
      setAnswer(Number(value));
    } else if (type === "radio_multi") {
      if (answer === null) {
        setAnswer((prev) => [...(prev || []), value]);
      } else if (answer.includes(value)) {
        setAnswer((prev) => prev.filter((item) => item !== value));
      } else {
        setAnswer((prev) => [...(prev || []), value]);
      }
    } else {
      setAnswer(value);
    }
  };

  console.log(answer);

  const handleSubmit = async () => {
    console.log(answer);
    setLoading(true);

    const newState: any = [];
    let keep = false;

    const filteredData = {
      ...predictData,
      [questions[currentQuestionIndex].question_value]:
        questions[currentQuestionIndex].type === "number"
          ? Number(answer)
          : questions[currentQuestionIndex].type === "radio_multi"
          ? answer
          : questions[currentQuestionIndex].answer.value_en[answer],
    };
    const filteredDataTest: any = [];

    console.log(filteredData);

    await CallApi.post("/predict", filteredData)
      .then(async (respon) => {
        // if answer all questions goes finish slider
        if (!respon.data.next_variable) {
          return dispatch(setToFinished());
        } else {
          await CallApi.post("/grouped_xai", filteredData)
            .then(async (resp) => {
              dispatch(setGroupedXai({ data: resp.data }));
              setChanceHistory((prev) => [
                ...prev,
                {
                  question: questions[currentQuestionIndex].question_value,
                  answer: answer,
                  chance: Math.round(Number(respon.data.result) * 100),
                  chartData: Object.values(resp.data.aggregated_shap_values).map((value) =>
                    (value * 100).toFixed(2)
                  ),
                },
              ]);

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
                  setActiveButton("");
                  setAnswer(null);
                  setLoading(false);
                  setAnswerPopup(false);
                  setQuestionCounter((prev) => prev + 1);
                  setCurrentQuestionIndex(
                    questions.findIndex(
                      (question) => question.question_value === respon.data.next_variable
                    )
                  );
                  dispatch(setChanceData({ chance: respon.data.result }));
                  dispatch(setNextPredictData({ nextVariable: respon.data.next_variable }));
                  dispatch(setNextPredictBackup({ nextVariable: respon.data.next_variable }));
                  setNextPredictData({ ...predictData, [respon.data.next_variable]: "" });
                  setPredictData(filteredData);
                })
                .catch((error) => {
                  console.log(error);
                });
            })
            .catch((error) => {
              console.log(error);
            });
        }
      })
      .catch((error) => {
        // if (error.response.data.detail.includes("max")) {
        //   dispatch(setToFinished());
        // }
        console.log(error);
      });
  };

  useEffect(() => {
    if (questions[currentQuestionIndex].type === "number") {
      setAnswer(questions[currentQuestionIndex].answer.value_fa[0]);
    }
  }, [questionCounter]);

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
                className={activeButton === index && styles.activeButton}
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
          ) : questions[currentQuestionIndex].type === "radio_multi" ? (
            questions[currentQuestionIndex].answer.value_fa.map((item, index) => (
              <button
                className={
                  answer !== null &&
                  answer.includes(questions[currentQuestionIndex].answer.value_en[index]) &&
                  styles.activeButton
                }
                key={index}
                onClick={() => {
                  handleChange(
                    questions[currentQuestionIndex].answer.value_en[index],
                    "radio_multi"
                  );
                  setActiveButton(index);
                }}
              >
                {item}
              </button>
            ))
          ) : (
            ""
          )}
        </div>
        <button
          disabled={answer === null && true}
          onClick={handleSubmit}
          className={styles.answerPopupSubmitButton}
        >
          {loading ? (
            <Loading />
          ) : (
            <>
              ثبت پاسخ <img src="forward-arrow.svg" alt="arrow-forward" />
            </>
          )}
        </button>
      </div>
    </>
  );
}
