"use client";
import InfoAlert from "@/components/shared/alerts/InfoAlert";
import styles from "./MainSliderMobile.module.css";
import Chart from "react-apexcharts";
import { useEffect, useRef, useState } from "react";
import PotentialPopup from "../../shared/popups/mobile/PotentialPopup";
import { questions } from "@/utils/QuestionJson";
import { useSelector } from "react-redux";
import CountUp from "react-countup";
import { SliderState } from "@/constants";
import FinishSliderPopup from "./FinishSliderPopup";
import SimilarDocsPopup from "../../shared/popups/mobile/SimilarDocsPopup";
import AnswerPopup from "@/components/shared/popups/mobile/AnswerPopup";
import ContactUsPopupMobile from "@/components/shared/popups/mobile/ContactUsPopupMobile";
import { areaData, barNegativeData, radarData, columnData } from "@/utils/ChartsJson";
import { useTour } from "@reactour/tour";
import Chance from "./MainSliderComponent/Chance";
import Charts from "./MainSliderComponent/Charts";

export default function MainSliderMobile({
  setName,
  name,
  answerPopup,
  setAnswerPopup,
  answer,
  setAnswer,
  setActiveButtonTour,
}) {
  const { isOpen, currentStep, steps, setIsOpen, setCurrentStep, setSteps } = useTour();
  const predict = useSelector((state) => state.predict);
  const slider = useSelector((state) => state.slider);
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

  const firstChartRef = useRef(null);
  const secondChartRef = useRef(null);
  const thirdChartRef = useRef(null);
  const fourthChartRef = useRef(null);
  const handleChartSidebar = () => {
    if (closeChart === true) {
      setCloseChart(false);
    }
  };

  const [disableIntract, setDisableIntract] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("tour") || localStorage.getItem("tour") === "false") {
      setIsOpen(true);
    }
  }, []);

  useEffect(() => {
    if (!answerPopup && questionCounter === 2) {
      setCurrentStep((prev) => prev + 1);
    }
  }, [answerPopup]);

  return (
    <>
      <div data-tut="reactour__1">
        <div data-tut="reactour__9" className={styles.header}>
          <Chance chanceHistory={chanceHistory} />
        </div>
        <div className={styles.main}>
          {showAlert && <InfoAlert questionCounter={questionCounter} setShowAlert={setShowAlert} />}

          <div className={styles.mainCharts}>
            <Charts
              firstChartRef={firstChartRef}
              dataTut="reactour__4"
              chartSelected={chartSelected}
              series={areaData(chanceHistory, questionCounter).series}
              options={areaData(chanceHistory, questionCounter).options}
              questionCounter={questionCounter}
              type="area"
            />

            <Charts
              firstChartRef={secondChartRef}
              dataTut="reactour__5"
              chartSelected={chartSelected}
              series={barNegativeData(chanceHistory, questionCounter).series}
              options={barNegativeData(chanceHistory, questionCounter).options}
              questionCounter={questionCounter}
              type="bar"
            />

            <Charts
              firstChartRef={thirdChartRef}
              dataTut="reactour__6"
              chartSelected={chartSelected}
              series={radarData(chanceHistory, questionCounter).series}
              options={radarData(chanceHistory, questionCounter).options}
              questionCounter={questionCounter}
              type="radar"
            />

            <Charts
              firstChartRef={thirdChartRef}
              dataTut="reactour__7"
              chartSelected={chartSelected}
              series={columnData(chanceHistory, questionCounter).series}
              options={columnData(chanceHistory, questionCounter).options}
              questionCounter={questionCounter}
              type="bar"
            />

            <button
              data-tut="reactour__5"
              onClick={() => setFinishPopup(true)}
              className={styles.moreInfoButton}
              disabled={slider.name !== SliderState.FINISHED && true}
            >
              اطلاعات بیشتر
            </button>
          </div>
        </div>

        <div data-tut="reactour__8" className={styles.footer}>
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
          {slider.name === SliderState.FINISHED ? (
            <div className={styles.footerFinished}>
              <button onClick={() => setSimilarDocsPopup(true)}>مشاهده پرونده‌های مشابه شما</button>
            </div>
          ) : (
            <div
              onClick={() => {
                setAnswerPopup(true);
                setDisableIntract(false);
              }}
              data-tut="reactour__2"
              className={styles.footerDown}
            >
              <div className={styles.footerDownQuestion}>
                <p>{questionCounter}</p>
                <p>{questions[currentQuestionIndex].question}</p>
              </div>

              <button className={styles.submitButton}>
                <img src="forward-arrow.svg" alt="forward-arrow" />
              </button>
            </div>
          )}
        </div>

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

      <div>
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
          setDisableIntract={setDisableIntract}
          answer={answer}
          setAnswer={setAnswer}
          setActiveButtonTour={setActiveButtonTour}
        />
      </div>

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
