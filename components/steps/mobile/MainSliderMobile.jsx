"use client";
import InfoAlert from "@/components/shared/alerts/InfoAlert";
import styles from "./MainSliderMobile.module.css";
import ApexChart from "@/utils/ApexChart";
import { useRef, useState } from "react";
import PotentialPopup from "../../shared/popups/PotentialPopup";

import { questions } from "@/utils/QuestionJson";
import { useDispatch, useSelector } from "react-redux";
import CountUp from "react-countup";
import ProgressAnimate from "@/components/shared/ProgressAnimate";
import { SliderState } from "@/constants";
import FinishSliderPopup from "./FinishSliderPopup";
import SimilarDocsPopup from "./SimilarDocsPopup";
import AnswerPopup from "@/components/shared/popups/AnswerPopup";

export default function MainSliderMobile() {
  const dispatch = useDispatch();
  const predict = useSelector((state) => state.predict);
  const slider = useSelector((state) => state.slider);
  const [answerPopup, setAnswerPopup] = useState(false);
  const [chancePopup, setChancePopup] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [chanceHistory, setChanceHistory] = useState([]);
  const [questionCounter, setQuestionCounter] = useState < any > 1;
  const [closeChart, setCloseChart] = useState(false);
  const [finishPopup, setFinishPopup] = useState(false);
  const [similarDocsPopup, setSimilarDocsPopup] = useState(false);

  let data = {
    series: [
      {
        name: "تغییرات پاسخ فعلی",
        data:
          chanceHistory.length > 0 && questionCounter >= 2
            ? chanceHistory[questionCounter - 2].chartData
            : [0, 0, 0, 0, 0],
      },
      {
        name: "تغییرات پاسخ قبلی نسبت فعلی",
        data:
          chanceHistory.length > 0 && questionCounter >= 3
            ? chanceHistory[questionCounter - 3].chartData
            : [0, 0, 0, 0, 0],
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "area",
        toolbar: {
          show: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
      },
      xaxis: {
        categories: [],
      },
      tooltip: {
        x: {
          // format: "dd/MM/yy HH:mm",
        },
      },
    },
  };

  let barData = {
    series: [
      {
        name: "تغییرات پاسخ فعلی",
        data:
          chanceHistory.length > 0 && questionCounter >= 2
            ? chanceHistory[questionCounter - 2].chartData
            : [0, 0, 0, 0, 0],
      },
      {
        name: "تغییرات پاسخ قبلی نسبت فعلی",
        data:
          chanceHistory.length > 0 && questionCounter >= 3
            ? chanceHistory[questionCounter - 3].chartData
            : [0, 0, 0, 0, 0],
      },
    ],
    options: {
      chart: {
        type: "bar",
        height: 440,
        stacked: true,
        toolbar: {
          show: false,
        },
      },
      colors: ["#008FFB", "#FF4560"],
      plotOptions: {
        bar: {
          horizontal: true,
          barHeight: "80%",
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        width: 1,
        colors: ["#fff"],
      },

      grid: {
        xaxis: {
          lines: {
            show: false,
          },
        },
      },
      yaxis: {
        min: -5,
        max: 5,
        title: {
          // text: 'Age',
        },
      },
      tooltip: {
        shared: false,
        x: {
          formatter: function (val) {
            return val;
          },
        },
        y: {
          formatter: function (val) {
            return Math.abs(val) + "%";
          },
        },
      },
      xaxis: {
        labels: {
          formatter: function (val) {
            return Math.abs(Math.round(val)) + "%";
          },
        },
      },
    },
  };

  let radarDara = {
    series: [
      {
        name: "تغییرات پاسخ فعلی",
        data:
          chanceHistory.length > 0 && questionCounter >= 2
            ? chanceHistory[questionCounter - 2].chartData
            : [0, 0, 0, 0, 0],
      },
      {
        name: "تغییرات پاسخ قبلی نسبت فعلی",
        data:
          chanceHistory.length > 0 && questionCounter >= 3
            ? chanceHistory[questionCounter - 3].chartData
            : [0, 0, 0, 0, 0],
      },
    ],
    options: {
      chart: {
        type: "radar",
        toolbar: {
          show: false,
        },
      },

      xaxis: {
        categories: ["January", "February", "March", "April", "May", "June"],
      },
    },
  };

  let barChart = {
    series: [
      {
        name: "تغییرات پاسخ فعلی",
        data:
          chanceHistory.length > 0 && questionCounter >= 2
            ? chanceHistory[questionCounter - 2].chartData
            : [0, 0, 0, 0, 0],
      },
      {
        name: "تغییرات پاسخ قبلی نسبت فعلی",
        data:
          chanceHistory.length > 0 && questionCounter >= 3
            ? chanceHistory[questionCounter - 3].chartData
            : [0, 0, 0, 0, 0],
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "bar",
        toolbar: {
          show: false,
        },
      },
      plotOptions: {
        bar: {
          borderRadius: 10,
          dataLabels: {
            position: "top", // top, center, bottom
          },
        },
      },
      dataLabels: {
        enabled: true,
        formatter: function (val) {
          return val + "%";
        },
        offsetY: -20,
        style: {
          fontSize: "12px",
          colors: ["#304758"],
        },
      },

      xaxis: {
        position: "top",
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        crosshairs: {
          fill: {
            type: "gradient",
            gradient: {
              colorFrom: "#D8E3F0",
              colorTo: "#BED1E6",
              stops: [0, 100],
              opacityFrom: 0.4,
              opacityTo: 0.5,
            },
          },
        },
        tooltip: {
          enabled: true,
        },
      },
      yaxis: {
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        labels: {
          show: false,
          formatter: function (val) {
            return val + "%";
          },
        },
      },
    },
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
          {<InfoAlert questionCounter={questionCounter} />}

          <div className={styles.mainCharts}>
            <div ref={firstChartRef} className={styles.mainChartsArea}>
              {questionCounter === 1 && (
                <div className={styles.blurChart}>
                  <p className={styles.noBlur}>نامشخص</p>
                  <p className={styles.noBlur}>تعداد پاسخ‌های شما تخمین این نمودار کافی نیست</p>
                </div>
              )}
              <ApexChart options={data.options} series={data.series} type="area" height={250} />
            </div>

            <div ref={secondChartRef} className={styles.mainChartsArea}>
              {questionCounter === 1 && (
                <div className={styles.blurChart}>
                  <p className={styles.noBlur}>نامشخص</p>
                  <p className={styles.noBlur}>تعداد پاسخ‌های شما تخمین این نمودار کافی نیست</p>
                </div>
              )}

              <ApexChart stacked={true} options={barData.options} series={barData.series} type="bar" height={250} />
            </div>

            <div ref={thirdChartRef} className={styles.mainChartsArea}>
              {questionCounter === 1 && (
                <div className={styles.blurChart}>
                  <p className={styles.noBlur}>نامشخص</p>
                  <p className={styles.noBlur}>تعداد پاسخ‌های شما تخمین این نمودار کافی نیست</p>
                </div>
              )}

              <ApexChart
                stacked={true}
                options={radarDara.options}
                series={radarDara.series}
                type="radar"
                height={250}
              />
            </div>

            <div ref={fourthChartRef} className={styles.mainChartsArea}>
              {questionCounter === 1 && (
                <div className={styles.blurChart}>
                  <p className={styles.noBlur}>نامشخص</p>
                  <p className={styles.noBlur}>تعداد پاسخ‌های شما تخمین این نمودار کافی نیست</p>
                </div>
              )}

              <ApexChart stacked={true} options={barChart.options} series={barChart.series} type="bar" height={250} />
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

      <AnswerPopup
        answerPopup={answerPopup}
        setAnswerPopup={setAnswerPopup}
        currentQuestionIndex={currentQuestionIndex}
        setCurrentQuestionIndex={setCurrentQuestionIndex}
        setChanceHistory={setChanceHistory}
        chanceHistory={chanceHistory}
        questionCounter={questionCounter}
        setQuestionCounter={setQuestionCounter}
      />

      <div className={finishPopup ? styles.finishPopup : styles.finishPopupNot}>
        {finishPopup && <FinishSliderPopup finishPopup={finishPopup} />}
      </div>

      <div className={similarDocsPopup ? styles.similarDocsPopup : styles.similarDocsPopupNot}>
        {similarDocsPopup && (
          <SimilarDocsPopup similarDocsPopup={similarDocsPopup} setSimilarDocsPopup={setSimilarDocsPopup} />
        )}
      </div>
      <PotentialPopup chancePopup={chancePopup} setChancePopup={setChancePopup} />
    </>
  );
}
