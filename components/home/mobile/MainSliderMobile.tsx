"use client";
import InfoAlert from "@/components/utils/alerts/InfoAlert";
import styles from "./MainSliderMobile.module.css";
import ApexChart from "@/utils/ApexChart";
import { useState } from "react";
import AnswerPopup from "@/components/utils/popups/AnswerPopup";
import PotentialPopup from "@/components/utils/popups/PotentialPopup";
import { questions } from "@/utils/QuestionJson";
import { useSelector } from "react-redux";
import CountUp from "react-countup";
import ProgressAnimate from "@/components/utils/ProgressAnimate";

export default function MainSliderMobile() {
  let data = {
    series: [
      {
        name: "series1",
        data: [31, 40, 28, 51, 42],
      },
      {
        name: "series2",
        data: [11, 32, 45, 32, 34, 52, 41],
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
        categories: ["test", "test2", "test3", "test4", "test5", "test6", "test7"],
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
        name: "Males",
        data: [
          -1, -5, -10, -20, -30, -40, 0, 1, 5, 10, 20, 30, 40, 45, 50, 54, 58, 59, 68, 69, 70, 90,
        ],
      },
      {
        name: "Females",
        data: [-80, -74, -52, -42, -32, -22, -10, 0, 12, 24, 34, 65, 70, 89],
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
      title: {
        text: "Mauritius population pyramid 2011",
      },
      xaxis: {
        title: {
          text: "Percent",
        },
        labels: {
          formatter: function (val) {
            return Math.abs(Math.round(val)) + "%";
          },
        },
      },
    },
  };

  const [answerPopup, setAnswerPopup] = useState(false);
  const [chancePopup, setChancePopup] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const predict = useSelector((state) => state.predict);
  const [chanceHistory, setChanceHistory] = useState<any[]>([]);
  const [questionCounter, setQuestionCounter] = useState<any>(1);

  function isNumberIncreasing(previousNumber: any, currentNumber: any) {
    // console.log(previousNumber, currentNumber);
    return currentNumber > previousNumber
      ? "more"
      : currentNumber < previousNumber
      ? "low"
      : currentNumber === previousNumber
      ? "equal"
      : "";
  }

  console.log(questionCounter);

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
          {questionCounter === 1 && <InfoAlert />}

          <div className={styles.mainCharts}>
            <div className={styles.mainChartsArea}>
              {questionCounter === 1 && (
                <div className={styles.blurChart}>
                  <p className={styles.noBlur}>نامشخص</p>
                  <p className={styles.noBlur}>تعداد پاسخ‌های شما تخمین این نمودار کافی نیست</p>
                </div>
              )}
              <ApexChart options={data.options} series={data.series} type="area" height={250} />
            </div>

            <div className={styles.mainChartsArea}>
              {questionCounter === 1 && (
                <div className={styles.blurChart}>
                  <p className={styles.noBlur}>نامشخص</p>
                  <p className={styles.noBlur}>تعداد پاسخ‌های شما تخمین این نمودار کافی نیست</p>
                </div>
              )}

              <ApexChart
                stacked={true}
                options={barData.options}
                series={barData.series}
                type="bar"
                height={250}
              />
            </div>
          </div>
        </div>
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
      <PotentialPopup chancePopup={chancePopup} setChancePopup={setChancePopup} />
    </>
  );
}
