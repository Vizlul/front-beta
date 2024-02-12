import dynamic from 'next/dynamic';
import styles from "./Charts.module.css";
const ApexCharts = dynamic(() => import('react-apexcharts'), { ssr: false });

export default function Charts({
  firstChartRef,
  dataTut,
  chartSelected,
  series,
  options,
  questionCounter,
  type
}) {
  return (
    <div data-tut={dataTut} ref={firstChartRef} className={styles.mainChartsArea}>
      {questionCounter === 1 && (
        <div className={styles.blurChart}>
          <p className={styles.noBlur}>نامشخص</p>
          <p className={styles.noBlur}>تعداد پاسخ‌های شما تخمین این نمودار کافی نیست</p>
        </div>
      )}

      <ApexCharts height={320} key={chartSelected} options={options} series={series} type={type} />
    </div>
  );
}
