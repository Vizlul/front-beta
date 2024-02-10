import Chart from "react-apexcharts";
import styles from "./Charts.module.css";

export default function Charts({
  firstChartRef,
  dataTut,
  chartSelected,
  series,
  options,
  questionCounter,
  type
}) {
  console.log(firstChartRef);
  console.log(dataTut);
  console.log(chartSelected);
  console.log(series);
  console.log(options);
  console.log(questionCounter);

  return (
    <div data-tut={dataTut} ref={firstChartRef} className={styles.mainChartsArea}>
      {questionCounter === 1 && (
        <div className={styles.blurChart}>
          <p className={styles.noBlur}>نامشخص</p>
          <p className={styles.noBlur}>تعداد پاسخ‌های شما تخمین این نمودار کافی نیست</p>
        </div>
      )}

      <Chart height={320} key={chartSelected} options={options} series={series} type={type} />
    </div>
  );
}
