import styles from "./ChartsBox.module.css";
import { areaData, barNegativeData, radarData, columnData } from "@/utils/ChartsJson";
import Charts from "@/components/shared/Charts";
import InfoAlert from "@/components/shared/alerts/InfoAlert";
import Image from "next/image";

export default function ChartsBox({
  showAlert,
  setShowAlert,
  questionCounter,
  chanceHistory,
  chartSelected,
  handleSetActiveChart,
  responseExplain,
}) {
  console.log(chartSelected)
  return (
    <div className={styles.mainSliderLeft}>
      {showAlert && <InfoAlert setShowAlert={setShowAlert} desktop={true} />}

      <div className={styles.mainCharts}>
        <div className={styles.mainChartsArea}>
          {questionCounter === 1 && (
            <div className={styles.blurChart}>
              <p className={styles.noBlur}>نامشخص</p>
              <p className={styles.noBlur}>تعداد پاسخ‌های شما تخمین این نمودار کافی نیست</p>
            </div>
          )}

          {chartSelected === "area" ? (
            <Charts
              height={320}
              key={chartSelected}
              options={areaData(chanceHistory, questionCounter, responseExplain).options}
              series={areaData(chanceHistory, questionCounter, responseExplain).series}
              type="area"
            />
          ) : chartSelected === "bar" ? (
            <Charts
              height={320}
              key={chartSelected}
              options={barNegativeData(chanceHistory, questionCounter, responseExplain).options}
              series={barNegativeData(chanceHistory, questionCounter, responseExplain).series}
              type="bar"
            />
          ) : chartSelected === "radar" ? (
            <Charts
              height={320}
              key={chartSelected}
              options={radarData(chanceHistory, questionCounter, responseExplain).options}
              series={radarData(chanceHistory, questionCounter, responseExplain).series}
              type="radar"
            />
          ) : chartSelected === "column" ? (
            <Charts
              height={320}
              key={chartSelected}
              options={columnData(chanceHistory, questionCounter, responseExplain).options}
              series={columnData(chanceHistory, questionCounter, responseExplain).series}
              type="bar"
            />
          ) : (
            ""
          )}
        </div>
      </div>

      <div className={styles.chartsIconsBox}>
        <div
          onClick={() => handleSetActiveChart("area")}
          className={`${styles.chartIcon} ${chartSelected === "area" && styles.activeChart}`}
        >
          <Image width="25" height="25" src="chart/LineChartIcon.svg" alt="chart-icon" />
          <p>شانس ویزا</p>
        </div>
        <div
          onClick={() => handleSetActiveChart("bar")}
          className={`${styles.chartIcon} ${chartSelected === "bar" && styles.activeChart}`}
        >
          <Image width="25" height="25" src="chart/NegativeBarChart Icon.svg" alt="chart-icon" />
          <p>نام جدول</p>
        </div>
        <div
          onClick={() => handleSetActiveChart("radar")}
          className={`${styles.chartIcon} ${chartSelected === "radar" && styles.activeChart}`}
        >
          <Image width="25" height="25" src="chart/RadarChartIcon.svg" alt="chart-icon" />
          <p>نام جدول</p>
        </div>
        <div
          onClick={() => handleSetActiveChart("column")}
          className={`${styles.chartIcon} ${chartSelected === "column" && styles.activeChart}`}
        >
          <Image width="25" height="25" src="chart/BarChartIcon.svg" alt="chart-icon" />
          <p>شناخت ویزارد</p>
        </div>
      </div>
    </div>
  );
}
