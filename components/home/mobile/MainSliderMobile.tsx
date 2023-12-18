import InfoAlert from "@/components/utils/alerts/InfoAlert";
import styles from "./MainSliderMobile.module.css";
import ReactApexChart from "react-apexcharts";

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

  return (
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
              <p>نا مشخص</p>
              <p>تعداد پاسخ‌های شما تخمین این نمودار کافی نیست</p>
            </div>
            <ReactApexChart options={data.options} series={data.series} type="area" height={250} />
          </div>
        </div>
      </div>
      <div></div>
    </div>
  );
}
