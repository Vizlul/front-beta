import dynamic from "next/dynamic";
import styles from "./Charts.module.css";
const ApexCharts = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function Charts({
  firstChartRef,
  dataTut,
  chartSelected,
  series,
  options,
  questionCounter,
  type,
  responseExplain,
  onClickFunc,
  className,
}) {
  return (
    <div data-tut={dataTut} ref={firstChartRef} className={className} onClick={onClickFunc}>
      {questionCounter === 1 && (
        <div className={styles.blurChart}>
          <p className={styles.noBlur}>نامشخص</p>
          <p className={styles.noBlur}>تعداد پاسخ‌های شما تخمین این نمودار کافی نیست</p>
        </div>
      )}

      <ApexCharts
        width="100%"
        height="100%"
        key={chartSelected}
        options={options}
        series={series}
        type={type} // Make sure type is passed to ApexCharts
      />
    </div>
  );
}
