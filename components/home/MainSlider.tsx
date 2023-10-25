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

export default function MainSlider() {
  const predict = useSelector((state: { predict: PredictInterface }) => state.predict);
  const dispatch = useDispatch();
  const [keyValue, setKeyValue] = useState({
    key: "",
    value: "",
  });
  const [predictData, setPredictData] = useState({});
  const [testValue, setTestValue] = useState("");
  const [activeButton, setActiveButton] = useState("")

  const handleChange = (value: string) => {
    setTestValue(value);
    console.log(value.value);
    const lastKey = questions[predict.questionIndex].question_value;

    if (lastKey === questions[predict.questionIndex].question_value) {
      if (predict.questionIndex === 0) {
        setPredictData({
          ...predictData,
          "sex": value.value,
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

  const handleSelectedChoice = (index: number) => {
    setActiveButton(index)
    const lastKey = predict.nextPredict;

    if (lastKey === predict.nextPredict) {
      if (predict.questionIndex === 0) {
        setPredictData({
          ...predictData,
          "sex": questions[predict.questionIndex].answer.value_en[index],
        });
      } else {
        setPredictData({
          ...predictData,
          [lastKey]: questions[predict.questionIndex].answer.value_en[index],
        });
      }
    } else {
      setPredictData({
        ...predictData,
        [questions[predict.questionIndex].question_value]: questions[predict.questionIndex].answer.value_en[index],
      });
    }
  };

  const handleSelectedChoiceNumber = (value: number) => {
    console.log(value);
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
    console.log(predictData);

    console.log(predictData);
    await CallApi.post("/predict", predictData)
      .then(async (resp) => {
        dispatch(setChanceData({ chance: resp.data.result }));
        dispatch(setNextPredictData({ nextVariable: resp.data.next_variable }));
        setPredictData({ ...predictData, [resp.data.next_variable]: "" })
        await CallApi.post("/grouped_xai", predictData).then((resp) => {
          dispatch(setGroupedXai({ data: resp.data }));
          setTestValue("");
          dispatch(addCounterQuestionIndex());
          dispatch(addCountAnswer())
          setActiveButton("")
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  console.log(predictData)
  const handleBack = () => {
    console.log("test");
  };
  console.log(predict.nextPredict);
  console.log(questions.find((item) => item.question_value === predict.nextPredict)?.question);
  console.log(predict.questionIndex)
  console.log(questions[32])

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
                    <div className={styles.questionsAnswers} v-if="">
                      <Select
                        className={styles.selectAnswer}
                        size="large"
                        labelInValue
                        value={testValue}
                        style={{ width: "100%", borderRadius: "0 !important" }}
                        onChange={handleChange}
                        options={questions.find((item) => item.question_value === predict.nextPredict)?.options}
                      />
                      {/* <a-select
                :default-value="{ key: testValue, label: testValue }"
                v-model="testValue"
                ref="select"
                @focus="focus"
              >
                <a-select-option
                  :value="item"
                  v-model="testValue"
                  v-for="(item, ind) in questions[questionIndex].answer.value_fa"
                  @click="handleSelectedChoice(index, ind)"
                  >{{ item }}</a-select-option
                >
              </a-select> */}
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
                <button disabled={Object.keys(predictData).length === 0 || (predict.countAnswer > 1 && predictData[predict.nextPredict]?.length === 0)} onClick={() => handleSubmit()} className={styles.submitButton}>
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
                      {/* <NumberCounterAnimate number={} /> */}
                    </span>
                  </div>
                  {/* <!-- <InfoCircleOutlined /> --> */}
                </div>

                {/* <a-progress className="progressBar" :percent="submitPredictStore.chance" status="active" :show-info="false" /> */}
                <Progress percent={predict.chance} status="active" />
                <div className="potansielChanceBoxFooter">
                  <img src="/CaretUp.svg" alt="icon" />
                  {/* {{ submitPredictStore.countAnswer }} */}
                  {/* {{ questionIndex }} */}
                  {/* <p>{{ indexChanges }}</p> */}
                  <p>درصد تغییر</p>
                </div>
              </div>
              <div className={styles.potansielChanceBox}>
                <div className="potansielChanceBoxHeader">
                  <div>
                    <p>شناخت ویزارد شما</p>
                    <span>%{/* <NumberCounter v-model:number="submitPredictStore.potential" /> */}</span>
                  </div>
                  {/* <!-- <InfoCircleOutlined /> --> */}
                </div>

                {/* <a-progress className="progressBar" :percent="submitPredictStore.potential" status="active" :show-info="false" /> */}
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
