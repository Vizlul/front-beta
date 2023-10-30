import React from "react";
import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip } from "chart.js";
import { Radar } from "react-chartjs-2";
import { useSelector } from "react-redux";
import predictSlice, { PredictInterface } from "@/store/features/predictSlice";
import Modal from "../modal/Modal";

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip);

export default function MyChart({ prevCounterQuestion }) {
  const predict = useSelector((state: { predict: PredictInterface }) => state.predict);
  // console.log(prevCounterQuestion)
  console.log(predict.questionNumber);

  const data = {
    labels: ["شغلی", "عاطفی", "اقتصادی", "هدف"],
    datasets: [
      {
        label: "temp1",
        backgroundColor: "rgba(0, 0, 0, 0)",
        data: [-1, -1, -1, -1],
        options: {},
      },
      {
        label: "Temp2",
        data: [1, 1, 1, 1],
        backgroundColor: "rgba(0, 0, 0, 0)",
        options: {
          plugins: {
            legend: false,
          },
        },
      },
      {
        label: "Vizard",
        data: predict.chartDataValues,
        backgroundColor: "rgba(0, 85, 78, 0.6)",
      },
      // questionCounter
      {
        label: "VizardSec",
        data:
          predict.questionNumber > 1
            ? prevCounterQuestion[prevCounterQuestion.length - 1]?.chartValues
            : predict.questionNumber < predict.countAnswer
            ? prevCounterQuestion[predict.questionNumber - 1]?.chartValues
            : [-1, -1, -1, -1],
        backgroundColor: "rgba(0, 85, 78, 0.2)",
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      r: {
        pointLabels: {
          font: {
            size: 16,
            family: "'FarhangFanum', sans-serif",
          },
        },
      },
    },
  };

  return (
    <>
      <Radar data={data} options={options} />
    </>
  );
}
