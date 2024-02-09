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
import Tour from "reactour";
import Link from "next/link";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";
import { useTour, TourProvider } from "@reactour/tour";

export default function MainSliderMobile({ setName, name, answerPopup, setAnswerPopup }) {
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

  console.log(currentStep);

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

  const tourConfig = () => {
    return [
      {
        selector: '[data-tut="reactour__1"]',
        content: `به ویزارد خیلی خوش اومدی راهنما رو دنبال کن تا با محیط ویزارد آشنا بشی`,
      },
      {
        selector: '[data-tut="reactour__2"]',
        content: `برای مشاهده سوال و پاسخ به اون روی این قسمت ضربه بزنید`,
        action: (node) => {
          // setDisableIntract(true);
          console.log("khob dobare true mishe dige");
          // Or whatever event you're waiting for
          node.onclick = () => {
            setCurrentStep(4);

            // ...
          };
        },
        observe: '[data-tut="reactour__state--observe"]',
      },
      {
        selector: '[data-tut="reactour__3"]',
        content: `تست 3`,
      },
      {
        selector: '[data-tut="reactour__4"]',
        content: () => (
          <div>
            <p color="#e5e5e5">
              The <p data-tooltip="this helper ⬇">tourist guide</p> could be dressed in any way, using custom
              components, styles and so on…
            </p>
            <p color="#373737" size=".7em" style={{ marginTop: ".7em" }}>
              <Link href="http://codepen.io/lbebber/full/ypgql/" color="dark" nospaces>
                Text effect
              </Link>{" "}
              by{" "}
              <Link href="https://twitter.com/lucasbebber" color="dark" nospaces>
                Lucas Bebber
              </Link>
            </p>
          </div>
        ),
      },
      {
        selector: '[data-tut="reactour__5"]',
        content: ({ goTo }) => (
          <div>
            If you wanna go anywhere, skipping places, it is absolutely possible.
            <br /> "Oh, I forgot something inside the bus…"{" "}
            <button
              style={{
                border: "1px solid #f7f7f7",
                background: "none",
                padding: ".3em .7em",
                fontSize: "inherit",
                display: "block",
                cursor: "pointer",
                margin: "1em auto",
              }}
              onClick={() => goTo(1)}
            >
              {" "}
              <span aria-label="bus" role="img">
                🚌
              </span>
            </button>
          </div>
        ),
      },
    ];
  };

  const disableBody = (target) => disableBodyScroll(target);
  const enableBody = (target) => enableBodyScroll(target);
  useEffect(() => {
    setIsOpen(true);
  }, []);
  useEffect(() => {
    if (!answerPopup && questionCounter === 2) {
      setCurrentStep((prev) => prev + 1)
    }
  }, [answerPopup]);
  console.log(isOpen);

  return (
    <>
      {/* <Tour
        onRequestClose={() => setIsTourOpen(false)}
        steps={tourConfig(setDisableIntract)}
        isOpen={isTourOpen}
        className="helper"
        rounded={5}
        accentColor="#5cb7b7"
        onAfterOpen={disableBody}
        onBeforeClose={enableBody}
        disableKeyboardNavigation={disableIntract}
        disableDotsNavigation={disableIntract}
        showButtons={!disableIntract}
      /> */}

      <div data-tut="reactour__1">
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

            <div data-tut="reactour__4" className={styles.mainChartsArea}>
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

            <div className={styles.mainChartsArea}>
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

            <div className={styles.mainChartsArea}>
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
              data-tut="reactour__5"
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
                  <CountUp start={chanceHistory[chanceHistory.length - 1]?.potential} end={predict.potential} />%
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
          </div>
        )}

        <div
          onClick={() => handleChartSidebar()}
          className={closeChart ? styles.chartsIconBox : styles.chartsIconBoxActive}
        >
          <div onClick={() => firstChartRef.current.scrollIntoView()} className={styles.chartsIcon}>
            <img src="chart/LineChartIcon.svg" alt="chart-icon" />
          </div>
          <div onClick={() => secondChartRef.current.scrollIntoView()} className={styles.chartsIcon}>
            <img src="chart/NegativeBarChart Icon.svg" alt="chart-icon" />
          </div>
          <div onClick={() => thirdChartRef.current.scrollIntoView()} className={styles.chartsIcon}>
            <img src="chart/RadarChartIcon.svg" alt="chart-icon" />
          </div>
          <div onClick={() => fourthChartRef.current.scrollIntoView()} className={styles.chartsIcon}>
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
        />
      </div>

      <div className={finishPopup ? styles.finishPopup : styles.finishPopupNot}>
        {finishPopup && <FinishSliderPopup finishPopup={finishPopup} setContactUsPopup={setContactUsPopup} />}
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
      {/* </TourProvider> */}
    </>
  );
}
