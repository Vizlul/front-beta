import styles from "./MainSlider.module.css";
import { questions } from "@/utils/QuestionJson";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import InfoAlert from "../utils/alerts/InfoAlert";
import Footer from "../Footer";
import Navbar from "../Navbar";
import Image from "next/image";
import CallApi from "@/utils/CallApi";
import {
  addCounterQuestionIndex,
  setChanceData,
  setGroupedXai,
  setNextPredictBackup,
  setNextPredictData,
  setPotentialData,
} from "@/store/features/predictSlice";
import { setToFinished } from "@/store/features/sliderSlice";
import Loading from "../utils/Loading";
import ApexCharts from "apexcharts";
import Chart from "react-apexcharts";
import { areaData, barNegativeData, radarData, columnData } from "@/utils/ChartsJson";
import CountUp from "react-countup";
import ProgressBar from "../MainSlider/ProgressBar";

export default function MainSlider() {
  const [questionCounter, setQuestionCounter] = useState(1);
  const [testValue, setTestValue] = useState("");
  const [activeButton, setActiveButton] = useState("");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [chanceHistory, setChanceHistory] = useState([]);
  const predict = useSelector((state) => state.predict);
  const slider = useSelector((state) => state.slider);
  const [answerPopup, setAnswerPopup] = useState(false);
  const [chancePopup, setChancePopup] = useState(false);
  const [closeChart, setCloseChart] = useState(false);
  const [chartSelected, setChartSelected] = useState("bar");
  const [answer, setAnswer] = useState(null);
  const [loading, setLoading] = useState(false);
  const [predictData, setPredictData] = useState({});
  const [prevCounterQuestion, setPrevCounterQuestion] = useState([]);
  const [animate, setAnimate] = useState(false);
  const [showAlert, setShowAlert] = useState(true);
  const [seriesBar, setSeriesBar] = useState("");
  const [toggler, setToggler] = useState(false);

  console.log(chanceHistory);

  function isNumberIncreasing(previousNumber, currentNumber) {
    return currentNumber > previousNumber
      ? "more"
      : currentNumber < previousNumber
      ? "low"
      : currentNumber === previousNumber
      ? "equal"
      : "";
  }

  const dispatch = useDispatch();

  const handleChange = (value, type) => {
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

  const handleSubmit = async () => {
    setLoading(true);

    const filteredData = {
      ...predictData,
      [questions[currentQuestionIndex].question_value]:
        questions[currentQuestionIndex].type === "number"
          ? Number(answer)
          : questions[currentQuestionIndex].type === "radio_multi"
          ? answer
          : questions[currentQuestionIndex].answer.value_en[answer],
    };

    await CallApi.post("/predict", filteredData)
      .then(async (respon) => {
        if (!respon.data.next_variable) {
          setActiveButton("");
          setAnswer(null);
          setLoading(false);
          setAnswerPopup(false);
          return dispatch(setToFinished());
        } else {
          await CallApi.post("/grouped_xai", filteredData)
            .then(async (resp) => {
              dispatch(setGroupedXai({ data: resp.data }));

              await CallApi.post("/potential", filteredData)
                .then(async (response) => {
                  dispatch(setPotentialData(response.data.result));
                  setChanceHistory((prev) => [
                    ...prev,
                    {
                      question: questions[currentQuestionIndex].question_value,
                      answer: answer,
                      chance: Math.round(Number(respon.data.result) * 100),
                      potential: Math.round(Number(response.data.result) * 100),
                      chartData: Object.values(resp.data.aggregated_shap_values).map((value) =>
                        (value * 100).toFixed(2)
                      ),
                    },
                  ]);
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
                  setAnimate((prev) => !prev);

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
        console.log(error);
      });
  };

  useEffect(() => {
    if (questions[currentQuestionIndex].type === "number") {
      setAnswer(questions[currentQuestionIndex].answer.value_fa[0]);
    }
  }, [questionCounter]);

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--potential",
      String(800 - 800 * (predict.potential / 100))
    );

    document.documentElement.style.setProperty(
      "--progress",
      String(800 - 800 * (predict.chance / 100))
    );
  }, [predict.potential, predict.chance]);

  const handleSetActiveChart = (value) => {
    setChartSelected(value);
    if (value === "area") {
      console.log(ApexCharts.getChartByID("area"));
      ApexCharts.getChartByID("area")?.updateOptions(
        areaData(chanceHistory, questionCounter).options
      );
      ApexCharts.getChartByID("area")?.updateSeries(
        areaData(chanceHistory, questionCounter).series
      );
    } else if (value === "bar") {
      console.log(ApexCharts.getChartByID("bar"));
      ApexCharts.getChartByID("bar")?.updateOptions(
        barNegativeData(chanceHistory, questionCounter).options
      );
      ApexCharts.getChartByID("bar")?.updateSeries(
        barNegativeData(chanceHistory, questionCounter).series
      );
    } else if (value === "radar") {
      console.log(ApexCharts.getChartByID("radar"));
      ApexCharts.getChartByID("radar")?.updateOptions(
        radarData(chanceHistory, questionCounter).options
      );
      ApexCharts.getChartByID("radar")?.updateSeries(
        radarData(chanceHistory, questionCounter).series
      );
    } else if (value === "column") {
      console.log(ApexCharts.getChartByID("column"));
      ApexCharts.getChartByID("column")?.updateOptions(
        columnData(chanceHistory, questionCounter).options
      );
      ApexCharts.getChartByID("column")?.updateSeries(
        columnData(chanceHistory, questionCounter).series
      );
    }
  };

  return (
    <div key={slider.name} className={styles.mainSliderPage}>
      <style>{`--progress: ${800 - 800 * (50 / 100)}`}</style>
      <Navbar />

      <div className={`${styles.mainSlider} ${styles.slideDown}`}>
        <div className={styles.mainSliderRight}>
          <div className={styles.questionBox}>
            <div className={styles.questionText}>
              <p>{questionCounter}</p>
              <p className={styles.slideRight} key={questionCounter}>
                {questions[currentQuestionIndex].question}
              </p>
            </div>
            <div key={questionCounter} className={`${styles.answerChioces} ${styles.slideLeft}`}>
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
                    style={{ maxWidth: "400px" }}
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
            <div className={styles.buttonGroups}>
              <button onClick={handleSubmit} disabled={answer === null && true}>
                {loading ? (
                  <Loading desktop={true} />
                ) : (
                  <>
                    ثبت پاسخ <img src="forward-arrow.svg" alt="arrow-forward" />
                  </>
                )}
              </button>

              <button disabled={true}>اطلاعات بیشتر</button>
            </div>
          </div>

          <div className={styles.chancePotentialBox} style={{ maxHeight: "310px" }}>
            <div className={styles.chanceBox} style={{ height: "100%" }}>
              <p>شانس ویزا</p>
              <ProgressBar isNumberIncreasing={isNumberIncreasing} chanceHistory={chanceHistory} number={predict.chance} type="chance" />
            </div>
            <div className={styles.potentialBox} style={{ height: "100%" }}>
              <p>شناخت ویزارد از شما</p>
              <ProgressBar isNumberIncreasing={isNumberIncreasing} chanceHistory={chanceHistory} number={predict.potential} type="potential" />
            </div>
          </div>
        </div>

        <div className={styles.mainSliderLeft}>
          {showAlert && <InfoAlert setShowAlert={setShowAlert} desktop={true} />}

          <div className={styles.mainCharts}>
            <div className={styles.mainChartsArea}>
              {questionCounter === 1 && (
                <div className={styles.blurChart}>
                  <p className={styles.noBlur}>نامشخص</p>
                  <p className={styles.noBlur}>تعداد پاسخ‌های شما تخمین این نمودار کافی نیست</p>
                </div>
              )}

              {chartSelected === "area" ? (
                <Chart
                  height={320}
                  key={chartSelected}
                  options={areaData(chanceHistory, questionCounter).options}
                  series={areaData(chanceHistory, questionCounter).series}
                  type="area"
                />
              ) : chartSelected === "bar" ? (
                <Chart
                  height={320}
                  key={chartSelected}
                  options={barNegativeData(chanceHistory, questionCounter).options}
                  series={barNegativeData(chanceHistory, questionCounter).series}
                  type="bar"
                />
              ) : chartSelected === "radar" ? (
                <Chart
                  height={320}
                  key={chartSelected}
                  options={radarData(chanceHistory, questionCounter).options}
                  series={radarData(chanceHistory, questionCounter).series}
                  type="radar"
                />
              ) : chartSelected === "column" ? (
                <Chart
                  height={320}
                  key={chartSelected}
                  options={columnData(chanceHistory, questionCounter).options}
                  series={columnData(chanceHistory, questionCounter).series}
                  type="bar"
                />
              ) : (
                ""
              )}
            </div>
          </div>

          <div className={styles.chartsIconsBox}>
            <div
              onClick={() => handleSetActiveChart("area")}
              className={`${styles.chartIcon} ${chartSelected === "area" && styles.activeChart}`}
            >
              <Image width="25" height="25" src="chart/LineChartIcon.svg" alt="chart-icon" />
              <p>نام جدول</p>
            </div>
            <div
              onClick={() => handleSetActiveChart("bar")}
              className={`${styles.chartIcon} ${chartSelected === "bar" && styles.activeChart}`}
            >
              <Image
                width="25"
                height="25"
                src="chart/NegativeBarChart Icon.svg"
                alt="chart-icon"
              />
              <p>نام جدول</p>
            </div>
            <div
              onClick={() => handleSetActiveChart("radar")}
              className={`${styles.chartIcon} ${chartSelected === "radar" && styles.activeChart}`}
            >
              <Image width="25" height="25" src="chart/RadarChartIcon.svg" alt="chart-icon" />
              <p>نام جدول</p>
            </div>
            <div
              onClick={() => handleSetActiveChart("column")}
              className={`${styles.chartIcon} ${chartSelected === "column" && styles.activeChart}`}
            >
              <Image width="25" height="25" src="chart/BarChartIcon.svg" alt="chart-icon" />
              <p>نام جدول</p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}