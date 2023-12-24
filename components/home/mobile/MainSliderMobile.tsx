"use client";
import InfoAlert from "@/components/utils/alerts/InfoAlert";
import styles from "./MainSliderMobile.module.css";
import ApexChart from "@/utils/ApexChart";
import { useState } from "react";
import AnswerPopup from "@/components/utils/popups/AnswerPopup";
import PotentialPopup from "@/components/utils/popups/PotentialPopup";
import { questions } from "@/utils/QuestionJson";

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
  const [answerPopup, setAnswerPopup] = useState(false);
  const [chancePopup, setChancePopup] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  return (
    <>
      <div>
        <div className={styles.header}>
          <div>
            <img src="visaland-logo2.svg" alt="visaland-logo" />
            <div>
              <p>شانس اخذ ویزا</p>
              <p>نامشخص</p>
            </div>
          </div>
        </div>
        <div className={styles.main}>
          <InfoAlert />
          <div className={styles.mainCharts}>
            <div className={styles.mainChartsArea}>
              <div className={styles.blurChart}>
                <p className={styles.noBlur}>نامشخص</p>
                <p className={styles.noBlur}>تعداد پاسخ‌های شما تخمین این نمودار کافی نیست</p>
              </div>
              <ApexChart options={data.options} series={data.series} type="area" height={250} />
            </div>
          </div>
        </div>
        <div className={styles.footer}>
          <div className={styles.footerTop}>
            <div onClick={() => setChancePopup(true)} className={styles.footerTopChance}>
              <p>شناخت ویزارد از شما</p>
              <p>0%</p>
            </div>
            <div className={styles.footerVisHead}>
              <img src="vizard-head.svg" alt="vizard-head" />
            </div>
          </div>

          <div className={styles.footerDown}>
            <div className={styles.footerDownQuestion}>
              <p>{currentQuestionIndex + 1}</p>
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
      />
      <PotentialPopup chancePopup={chancePopup} setChancePopup={setChancePopup} />
    </>
  );
}
