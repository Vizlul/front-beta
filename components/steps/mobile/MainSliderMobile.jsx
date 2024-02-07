"use client";
import InfoAlert from "@/components/shared/alerts/InfoAlert";
import styles from "./MainSliderMobile.module.css";
import ApexCharts from "apexcharts";
import Chart from "react-apexcharts";
import { useRef, useState } from "react";
import PotentialPopup from "../../shared/popups/PotentialPopup";

import { questions } from "@/utils/QuestionJson";
import { useSelector } from "react-redux";
import CountUp from "react-countup";
import { SliderState } from "@/constants";
import FinishSliderPopup from "./FinishSliderPopup";
import SimilarDocsPopup from "./SimilarDocsPopup";
import AnswerPopup from "@/components/shared/popups/AnswerPopup";
import ContactUsPopupMobile from "@/components/shared/popups/ContactUsPopupMobile";
import { areaData, barNegativeData, radarData, columnData } from "@/utils/ChartsJson";

export default function MainSliderMobile({ setName, name }) {
  const predict = useSelector((state) => state.predict);
  const slider = useSelector((state) => state.slider);
  const [answerPopup, setAnswerPopup] = useState(false);
  const [chancePopup, setChancePopup] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [chanceHistory, setChanceHistory] = useState([]);
  const [questionCounter, setQuestionCounter] = useState(1);
  const [closeChart, setCloseChart] = useState(false);
  const [finishPopup, setFinishPopup] = useState(false);
  const [similarDocsPopup, setSimilarDocsPopup] = useState(false);
  const [contactUsPopup, setContactUsPopup] = useState(false);
  const [showAlert, setShowAlert] = useState(true);
  const [chartSelected, setChartSelected] = useState("bar");
  const [similarDocsData, setSimilarDocsData] = useState([]);

  const handleSetActiveChart = (value) => {
    setChartSelected(value);
    ApexCharts.getChartByID(value)?.updateOptions(areaData(chanceHistory, questionCounter).options);
    ApexCharts.getChartByID(value)?.updateSeries(areaData(chanceHistory, questionCounter).series);
  };

  function isNumberIncreasing(previousNumber, currentNumber) {
    // console.log(previousNumber, currentNumber);
    return currentNumber > previousNumber
      ? "more"
      : currentNumber < previousNumber
      ? "low"
      : currentNumber === previousNumber
      ? "equal"
      : "";
  }

  const firstChartRef = useRef(null);
  const secondChartRef = useRef(null);
  const thirdChartRef = useRef(null);
  const fourthChartRef = useRef(null);
  const handleChartSidebar = () => {
    if (closeChart === true) {
      setCloseChart(false);
    }
  };

  return (
    <>
      <div>
        <div className={styles.header}>
          <div>
            <img src="visaland-logo2.svg" alt="visaland-logo" />
            <div>
              <p>شانس اخذ ویزا</p>
              <p>
                {isNumberIncreasing(
                  chanceHistory[chanceHistory.length - 2]?.chance,
                  chanceHistory[chanceHistory.length - 1]?.chance
                ) === "more" ? (
                  <img src="/CaretUp.svg" alt="icon" />
                ) : isNumberIncreasing(
                    chanceHistory[chanceHistory.length - 2]?.chance,
                    chanceHistory[chanceHistory.length - 1]?.chance
                  ) === "low" ? (
                  <img
                    src="/CaretDown.svg"
                    style={{
                      color: "red",
                      transform: "translate(rotate(-180deg))",
                    }}
                    alt="icon"
                  />
                ) : (
                  <img src="/CaretEqual.svg" alt="icon" />
                )}
              </p>
              {predict.chance === 0 ? (
                <p className={styles.chanceBoxUnknown}>نامشخص</p>
              ) : (
                <p className={predict.chance > 50 ? styles.chanceBoxGreen : styles.chanceBoxRed}>
                  <CountUp end={predict.chance} />%
                </p>
              )}
            </div>
          </div>
        </div>
        <div className={styles.main}>
          {showAlert && <InfoAlert questionCounter={questionCounter} setShowAlert={setShowAlert} />}

          <div className={styles.mainCharts}>
            <div ref={firstChartRef} className={styles.mainChartsArea}>
              {questionCounter === 1 && (
                <div className={styles.blurChart}>
                  <p className={styles.noBlur}>نامشخص</p>
                  <p className={styles.noBlur}>تعداد پاسخ‌های شما تخمین این نمودار کافی نیست</p>
                </div>
              )}

              <Chart
                height={320}
                key={chartSelected}
                options={areaData(chanceHistory, questionCounter).options}
                series={areaData(chanceHistory, questionCounter).series}
                type="area"
              />
            </div>

            <div ref={secondChartRef} className={styles.mainChartsArea}>
              {questionCounter === 1 && (
                <div className={styles.blurChart}>
                  <p className={styles.noBlur}>نامشخص</p>
                  <p className={styles.noBlur}>تعداد پاسخ‌های شما تخمین این نمودار کافی نیست</p>
                </div>
              )}

              <Chart
                height={320}
                key={chartSelected}
                options={barNegativeData(chanceHistory, questionCounter).options}
                series={barNegativeData(chanceHistory, questionCounter).series}
                type="bar"
              />
            </div>

            <div ref={thirdChartRef} className={styles.mainChartsArea}>
              {questionCounter === 1 && (
                <div className={styles.blurChart}>
                  <p className={styles.noBlur}>نامشخص</p>
                  <p className={styles.noBlur}>تعداد پاسخ‌های شما تخمین این نمودار کافی نیست</p>
                </div>
              )}

              <Chart
                height={320}
                key={chartSelected}
                options={radarData(chanceHistory, questionCounter).options}
                series={radarData(chanceHistory, questionCounter).series}
                type="radar"
              />
            </div>

            <div ref={fourthChartRef} className={styles.mainChartsArea}>
              {questionCounter === 1 && (
                <div className={styles.blurChart}>
                  <p className={styles.noBlur}>نامشخص</p>
                  <p className={styles.noBlur}>تعداد پاسخ‌های شما تخمین این نمودار کافی نیست</p>
                </div>
              )}

              <Chart
                height={320}
                key={chartSelected}
                options={columnData(chanceHistory, questionCounter).options}
                series={columnData(chanceHistory, questionCounter).series}
                type="bar"
              />
            </div>

            <button
              onClick={() => setFinishPopup(true)}
              className={styles.moreInfoButton}
              disabled={slider.name !== SliderState.FINISHED && true}
            >
              اطلاعات بیشتر
            </button>
          </div>
        </div>
        {slider.name === SliderState.FINISHED ? (
          <div className={styles.footer}>
            <div className={styles.footerTop}>
              <div onClick={() => setChancePopup(true)} className={styles.footerTopChance}>
                <p>شناخت ویزارد از شما</p>
                <p>
                  <CountUp
                    start={chanceHistory[chanceHistory.length - 1]?.potential}
                    end={predict.potential}
                  />
                  %
                </p>
              </div>

              <div className={styles.progressBarBox}>
                <div
                  style={{
                    width: predict.potential + "%",
                  }}
                  className={styles.progressBar}
                ></div>
              </div>

              <div className={styles.footerVisHead}>
                <img src="vizard-head.svg" alt="vizard-head" />
              </div>
            </div>
            <div className={styles.footerFinished}>
              <button onClick={() => setSimilarDocsPopup(true)}>مشاهده پرونده‌های مشابه شما</button>
            </div>
          </div>
        ) : (
          <div className={styles.footer}>
            <div className={styles.footerTop}>
              <div onClick={() => setChancePopup(true)} className={styles.footerTopChance}>
                <p>شناخت ویزارد از شما</p>
                <p>
                  <CountUp end={predict.potential} />%
                </p>
              </div>

              <div className={styles.progressBarBox}>
                <div
                  style={{
                    width: predict.potential + "%",
                  }}
                  className={styles.progressBar}
                ></div>
              </div>

              <div className={styles.footerVisHead}>
                <img src="vizard-head.svg" alt="vizard-head" />
              </div>
            </div>
            <div className={styles.footerDown}>
              <div className={styles.footerDownQuestion}>
                <p>{questionCounter}</p>
                <p>{questions[currentQuestionIndex].question}</p>
              </div>

              <button
                className={styles.submitButton}
                onClick={() => {
                  setAnswerPopup(true);
                  // setCurrentQuestionIndex(currentQuestionIndex + 1);
                }}
              >
                <img src="forward-arrow.svg" alt="forward-arrow" />
              </button>
            </div>
          </div>
        )}

        <div
          onClick={() => handleChartSidebar()}
          className={closeChart ? styles.chartsIconBox : styles.chartsIconBoxActive}
        >
          <div onClick={() => firstChartRef.current.scrollIntoView()} className={styles.chartsIcon}>
            <img src="chart/LineChartIcon.svg" alt="chart-icon" />
          </div>
          <div
            onClick={() => secondChartRef.current.scrollIntoView()}
            className={styles.chartsIcon}
          >
            <img src="chart/NegativeBarChart Icon.svg" alt="chart-icon" />
          </div>
          <div onClick={() => thirdChartRef.current.scrollIntoView()} className={styles.chartsIcon}>
            <img src="chart/RadarChartIcon.svg" alt="chart-icon" />
          </div>
          <div
            onClick={() => fourthChartRef.current.scrollIntoView()}
            className={styles.chartsIcon}
          >
            <img src="chart/BarChartIcon.svg" alt="chart-icon" />
          </div>
          <div onClick={() => setCloseChart((prev) => !prev)} className={styles.closeIconBox}>
            <img src="chart/x.svg" alt="chart-icon" />
          </div>
        </div>
      </div>

      <AnswerPopup
        answerPopup={answerPopup}
        setAnswerPopup={setAnswerPopup}
        currentQuestionIndex={currentQuestionIndex}
        setCurrentQuestionIndex={setCurrentQuestionIndex}
        setChanceHistory={setChanceHistory}
        chanceHistory={chanceHistory}
        questionCounter={questionCounter}
        setQuestionCounter={setQuestionCounter}
        setName={setName}
        name={name}
        setSimilarDocsData={setSimilarDocsData}
      />

      <div className={finishPopup ? styles.finishPopup : styles.finishPopupNot}>
        {finishPopup && (
          <FinishSliderPopup finishPopup={finishPopup} setContactUsPopup={setContactUsPopup} />
        )}
      </div>

      <div className={similarDocsPopup ? styles.similarDocsPopup : styles.similarDocsPopupNot}>
        {similarDocsPopup && (
          <SimilarDocsPopup
            similarDocsPopup={similarDocsPopup}
            setSimilarDocsPopup={setSimilarDocsPopup}
            similarDocsData={similarDocsData}
          />
        )}
      </div>

      <div className={contactUsPopup ? styles.contactPopup : styles.contactPopupNot}>
        <ContactUsPopupMobile
          setContactUsPopup={setContactUsPopup}
          setSimilarDocsPopup={setSimilarDocsPopup}
          setFinishPopup={setFinishPopup}
        />
      </div>
      <PotentialPopup chancePopup={chancePopup} setChancePopup={setChancePopup} />
    </>
  );
}
