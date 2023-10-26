import { Button, InputNumber, Progress, Select } from "antd";
import MyChart from "../utils/chart/Chart";
import SliderComponent from "../utils/slider/SliderComponent";
import styles from "./MainSlider.module.css";
import { questions } from "@/utils/QuestionJson";
import { useDispatch, useSelector } from "react-redux";
import {
  PredictInterface,
  addCountAnswer,
  addCounterQuestionIndex,
  setChanceData,
  setChartData,
  setGroupedXai,
  setNextPredictData,
} from "@/store/features/predictSlice";
import { AiOutlineArrowRight, AiOutlineArrowLeft } from "react-icons/ai";
import CallApi from "@/utils/CallApi";
import { useEffect, useState } from "react";
import CountUp from "react-countup";
import { setToFinished } from "@/store/features/sliderSlice";

export default function MainSlider() {
  const predict = useSelector((state: { predict: PredictInterface }) => state.predict);
  const dispatch = useDispatch();

  const [predictData, setPredictData] = useState({});
  const [testValue, setTestValue] = useState("");
  const [activeButton, setActiveButton] = useState("");

  const handleChange = (value: any) => {
    setTestValue(value);
    const lastKey = questions[predict.questionIndex].question_value;

    if (lastKey === questions[predict.questionIndex].question_value) {
      if (predict.questionIndex === 0) {
        setPredictData({
          ...predictData,
          sex: value.value,
        });
      } else {
        setPredictData({
          ...predictData,
          [lastKey]: value.value,
        });
      }
    } else {
      setPredictData({
        ...predictData,
        [questions[predict.questionIndex].question_value]: value.value,
      });
    }
  };

  const handleSelectedChoice = (index: number | any) => {
    setActiveButton(index);
    const lastKey = predict.nextPredict;

    if (lastKey === predict.nextPredict) {
      if (predict.questionIndex === 0) {
        const valueEn = questions[predict.questionIndex]?.answer?.value_en;
        if (valueEn) {
          setPredictData({
            ...predictData,
            sex: valueEn[index],
          });
        }
      } else {
        const valueEn = questions[predict.questionIndex]?.answer?.value_en;
        if (valueEn) {
          setPredictData({
            ...predictData,
            [lastKey]: valueEn[index],
          });
        }
      }
    } else {
      const questionValue = questions[predict.questionIndex]?.question_value;
      const valueEn = questions[predict.questionIndex]?.answer?.value_en;
      if (questionValue && valueEn) {
        setPredictData({
          ...predictData,
          [questionValue]: valueEn[index],
        });
      }
    }
  };

  const handleSelectedChoiceNumber = (value: number | any) => {
    setTestValue(value);
    const lastKey = predict.nextPredict;

    if (lastKey === predict.nextPredict) {
      setPredictData({
        ...predictData,
        [lastKey]: value,
      });
    } else {
      setPredictData({
        ...predictData,
        [predict.nextPredict]: value,
      });
    }
  };

  const handleSubmit = async () => {
    await CallApi.post("/predict", predictData)
      .then(async (resp) => {
        dispatch(setChanceData({ chance: resp.data.result }));
        dispatch(setNextPredictData({ nextVariable: resp.data.next_variable }));
        setPredictData({ ...predictData, [resp.data.next_variable]: "" });
        await CallApi.post("/grouped_xai", predictData).then((resp) => {
          dispatch(setGroupedXai({ data: resp.data }));
          if (predict.countAnswer === 1) {
            dispatch(addCounterQuestionIndex());
          } else {
            dispatch(addCounterQuestionIndex({ change: true }));
          }
          setTestValue("");
          dispatch(addCountAnswer());
          setActiveButton("");
        });
      })
      .catch((error) => {
        if (error.response.data.detail.includes("max")) {
          dispatch(setToFinished());
        }
        console.log(error);
      });
  };
  const handleBack = () => {};

  useEffect(() => {
    if (predict.questionIndex > 0) {
      dispatch(addCounterQuestionIndex({ change: true }));
    }
  }, [predict.questionIndex]);

  return (
    <div className={styles.mainSlider}>
      <div className={styles.mainSliderRight}>
        <div className={styles.mainSliderRightBox}>
          <div style={{ background: "#fff", width: "100%" }}>
            <SliderComponent />
          </div>
        </div>

        <div className={styles.mainSliderRightBox}>
          <div style={{ background: "#fff", width: "100%" }}>
            <div className={styles.questionContainer}>
              <div className={styles.questionBox}>
                <div className={styles.questionBoxRight}>
                  <span>سوال فعلی</span>
                  <p>
                    {predict.questionIndex === 0
                      ? questions[predict.questionIndex].question
                      : questions.find((item) => item.question_value === predict.nextPredict)?.question}
                  </p>
                  {questions[predict.questionIndex].type === "number" ? (
                    <div>
                      <InputNumber
                        onChange={handleSelectedChoiceNumber}
                        value={testValue}
                        className={styles.numberInput}
                        min={questions[predict.questionIndex].answer.value_fa[0]}
                        max={questions[predict.questionIndex].answer.value_fa[1]}
                        controls={true}
                      />
                    </div>
                  ) : questions[predict.questionIndex].type === "dropdown" ? (
                    <div className={styles.questionsAnswers}>
                      <Select
                        className={styles.selectAnswer}
                        size="large"
                        labelInValue
                        value={testValue}
                        style={{ width: "100%", borderRadius: "0 !important" }}
                        onChange={handleChange}
                        options={questions.find((item) => item.question_value === predict.nextPredict)?.options}
                      />
                    </div>
                  ) : questions[predict.questionIndex].type === "radio" ? (
                    <div className={styles.questionsAnswers}>
                      {questions[predict.questionIndex].answer.value_fa.map((item, index) => (
                        <div className={styles.buttonChoices} key={index}>
                          <button
                            onClick={() => handleSelectedChoice(index)}
                            className={`${styles.sampleButton} ${
                              (activeButton === index && styles.activeButton) ||
                              (predict.lastData[predict.questionIndex]?.answer === item && "active")
                            }`}
                          >
                            {item}
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    ""
                  )}
                </div>
                <div className={styles.questionBoxLeft}>
                  <p>{predict.countAnswer}</p>
                </div>
              </div>
              <div className={styles.questionBoxButtonGroups}>
                <button onClick={() => handleBack()} className={styles.backButton} disabled={predict.questionIndex === 0}>
                  <AiOutlineArrowRight />
                </button>
                <button
                  disabled={
                    Object.keys(predictData).length === 0 || (predict.countAnswer > 1 && predictData[predict.nextPredict]?.length === 0)
                  }
                  onClick={() => handleSubmit()}
                  className={styles.submitButton}
                >
                  ثبت پاسخ
                  <AiOutlineArrowLeft style={{ fontSize: "12px" }} />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.mainSliderRightBox}>
          <div style={{ width: "100%" }}>
            <div className={styles.potansielChanceContainer}>
              <div className={styles.potansielChanceBox}>
                <div className="potansielChanceBoxHeader">
                  <div>
                    <p>شانس ویزا</p>
                    <span>
                      %<CountUp end={predict.chance} />
                    </span>
                  </div>
                </div>

                <Progress percent={predict.chance} status="active" />
                <div className="potansielChanceBoxFooter">
                  <img src="/CaretUp.svg" alt="icon" />
                  <p>درصد تغییر</p>
                </div>
              </div>
              <div className={styles.potansielChanceBox}>
                <div className="potansielChanceBoxHeader">
                  <div>
                    <p>شناخت ویزارد شما</p>
                    <span>%{/* <NumberCounter v-model:number="submitPredictStore.potential" /> */}</span>
                  </div>
                </div>
                <Progress percent={50} status="active" />
                <div className="potansielChanceBoxFooter">
                  <img src="/CaretUp.svg" alt="icon" />
                  <p>نسبت تغییرات</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className={styles.mainSliderLeft}
        style={{ background: "#fff", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <MyChart />
      </div>
    </div>
  );
}
