import styles from "./MainSlider.module.css";
import { questions } from "@/utils/QuestionJson";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import InfoAlert from "../../shared/alerts/InfoAlert";
import Footer from "../../shared/Footer";
import Navbar from "../../shared/Navbar";
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
import { areaData, barNegativeData, radarData, columnData } from "@/utils/ChartsJson";
import ProgressBar from "../../shared/ProgressBar";
import ChacnePotentialModalDesktop from "../../shared/popups/desktop/ChancePotentialModalDesktop";
import ButtonComponent from "../../shared/button/ButtonComponent";
import SimilarDocsPopupDesktop from "../../shared/popups/desktop/SimilarDocsPopupDesktop";
import VideoPlayer from "../../shared/VideoPlayer";
import dynamic from "next/dynamic";
import Charts from "../mobile/MainSliderComponent/Charts";
const ApexCharts = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function MainSlider({ name, setName }) {
  const dispatch = useDispatch();
  const [questionCounter, setQuestionCounter] = useState(1);
  const [testValue, setTestValue] = useState("");
  const [activeButton, setActiveButton] = useState("");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [chanceHistory, setChanceHistory] = useState([]);
  const predict = useSelector((state) => state.predict);
  const slider = useSelector((state) => state.slider);
  const [answerPopup, setAnswerPopup] = useState(false);
  const [chancePotentialPopup, setChancePotentialPopup] = useState({
    value: false,
    type: "",
  });
  const [chartSelected, setChartSelected] = useState("bar");
  const [answer, setAnswer] = useState(null);
  const [loading, setLoading] = useState(false);
  const [predictData, setPredictData] = useState({});
  const [prevCounterQuestion, setPrevCounterQuestion] = useState([]);
  const [animate, setAnimate] = useState(false);
  const [showAlert, setShowAlert] = useState(true);
  const [finsihed, setFinished] = useState(false);
  const [openSimilarDocsPopup, setOpenSimilarDocsPopup] = useState(false);
  const [contactUs, setContatcUs] = useState(false);
  const [videoPopup, setVideoPopup] = useState(false);
  const [similarDocsData, setSimilarDocsData] = useState([]);
  const [responseExplain, setResponseExplain] = useState([]);
  console.log(chartSelected);

  function isNumberIncreasing(previousNumber, currentNumber) {
    return currentNumber > previousNumber
      ? "more"
      : currentNumber < previousNumber
      ? "low"
      : currentNumber === previousNumber
      ? "equal"
      : "";
  }

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
          await fetch(`/api/user-chance`, {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: name,
              chance: chanceHistory[chanceHistory.length - 1].chance,
            }),
          }).then(async (res) => {
            await fetch(
              `${process.env.NEXT_PUBLIC_API_URL}/artificial_records?acceptance_rate=${
                chanceHistory[chanceHistory.length - 1].chance / 100
              }&number_of_records=5`,
              {
                method: "POST",
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
                },
                body: null,
              }
            ).then(async (res) => {
              const data = await res.json();
              setSimilarDocsData(data);
            });
          });
          setActiveButton("");
          setAnswer(null);
          setLoading(false);
          setFinished(true);
          setName("");
          return;
        } else {
          await CallApi.post("/grouped_xai", filteredData)
            .then(async (resp) => {
              dispatch(setGroupedXai({ data: resp.data }));

              await CallApi.post("/potential", filteredData)
                .then(async (response) => {
                  await CallApi.post(
                    `${process.env.NEXT_PUBLIC_API_URL}/response_explain`,
                    filteredData,
                    {
                      headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                      },
                    }
                  )
                    .then((res) => {
                      console.log(res.data);
                      setResponseExplain(res.data);
                    })
                    .catch((err) => {
                      console.log(err);
                    });
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
    ApexCharts.getChartByID(value)?.updateOptions(areaData(chanceHistory, questionCounter).options);
    ApexCharts.getChartByID(value)?.updateSeries(areaData(chanceHistory, questionCounter).series);
  };

  return (
    <div key={slider.name} className={`${styles.mainSliderPage} `}>
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
              {finsihed ? (
                <ButtonComponent
                  onClickFunc={() => setOpenSimilarDocsPopup(true)}
                  title="مشاهده پرونده مشابه شما"
                  width="200px"
                ></ButtonComponent>
              ) : (
                <ButtonComponent
                  title="ثبت پاسخ"
                  onClickFunc={handleSubmit}
                  disabledFunc={answer === null && true}
                  loading={loading}
                  icon={<img src="forward-arrow.svg" alt="arrow-forward" />}
                ></ButtonComponent>
              )}

              <ButtonComponent
                title="اطلاعات بیشتر"
                onClickFunc={() => setVideoPopup(true)}
                disabledFunc={!finsihed && true}
              ></ButtonComponent>
            </div>
          </div>

          <div className={styles.chancePotentialBox} style={{ maxHeight: "310px" }}>
            <div
              className={styles.chanceBox}
              style={{ height: "100%" }}
              onClick={() =>
                setChancePotentialPopup({
                  value: true,
                  type: "chance",
                })
              }
            >
              <p>شانس ویزا</p>
              <ProgressBar
                isNumberIncreasing={isNumberIncreasing}
                chanceHistory={chanceHistory}
                number={predict.chance}
                type="chance"
              />
            </div>

            <div
              className={styles.potentialBox}
              style={{ height: "100%" }}
              onClick={() =>
                setChancePotentialPopup({
                  value: true,
                  type: "potential",
                })
              }
            >
              <p>شناخت ویزارد از شما</p>
              <ProgressBar
                isNumberIncreasing={isNumberIncreasing}
                chanceHistory={chanceHistory}
                number={predict.potential}
                type="potential"
              />
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
                <Charts
                  height={320}
                  key={chartSelected}
                  options={areaData(chanceHistory, questionCounter, responseExplain).options}
                  series={areaData(chanceHistory, questionCounter, responseExplain).series}
                  type="area"
                />
              ) : chartSelected === "bar" ? (
                <Charts
                  height={320}
                  key={chartSelected}
                  options={barNegativeData(chanceHistory, questionCounter, responseExplain).options}
                  series={barNegativeData(chanceHistory, questionCounter, responseExplain).series}
                  type="bar"
                />
              ) : chartSelected === "radar" ? (
                <Charts
                  height={320}
                  key={chartSelected}
                  options={radarData(chanceHistory, questionCounter, responseExplain).options}
                  series={radarData(chanceHistory, questionCounter, responseExplain).series}
                  type="radar"
                />
              ) : chartSelected === "column" ? (
                <Charts
                  height={320}
                  key={chartSelected}
                  options={columnData(chanceHistory, questionCounter, responseExplain).options}
                  series={columnData(chanceHistory, questionCounter, responseExplain).series}
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
              <p>شانس ویزا</p>
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
              <p>شناخت ویزارد</p>
            </div>
          </div>
        </div>
      </div>

      <Footer />

      <div
        onClick={() => setChancePotentialPopup({ value: false, type: "" })}
        className={
          chancePotentialPopup.value ? styles.popupBoxAnimation : styles.popupBoxAnimationNot
        }
      >
        {chancePotentialPopup.value && (
          <ChacnePotentialModalDesktop
            chancePotentialPopup={chancePotentialPopup}
            setChancePotentialPopup={setChancePotentialPopup}
            isNumberIncreasing={isNumberIncreasing}
            chanceHistory={chanceHistory}
            number={predict.chance}
          />
        )}
      </div>

      <div className={openSimilarDocsPopup ? styles.similarDocsPopup : styles.similarDocsPopupNot}>
        <SimilarDocsPopupDesktop
          contactUs={contactUs}
          setContatcUs={setContatcUs}
          setOpenSimilarDocsPopup={setOpenSimilarDocsPopup}
          chance={chanceHistory[chanceHistory.length - 1]?.chance}
          similarDocsData={similarDocsData}
        />
      </div>

      <div className={videoPopup || contactUs ? styles.videoPopup : styles.videoPopupNot}>
        {videoPopup && (
          <VideoPlayer
            videoPopup={videoPopup}
            setContactUsPopup={setContatcUs}
            setVideoPopup={setVideoPopup}
          />
        )}
        {!videoPopup && contactUs && (
          <SimilarDocsPopupDesktop
            contactUs={contactUs}
            setContatcUs={setContatcUs}
            setOpenSimilarDocsPopup={setOpenSimilarDocsPopup}
            setVideoPopup={setVideoPopup}
            chance={chanceHistory[chanceHistory.length - 1]?.chance}
            similarDocsData={similarDocsData}
          />
        )}
      </div>
    </div>
  );
}
