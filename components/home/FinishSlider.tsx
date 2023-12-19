import { PredictInterface } from "@/store/features/predictSlice";
import { useSelector } from "react-redux";
import styles from "./FinishSlider.module.css";

export default function FinishSlider() {
  const predict = useSelector((state: { predict: PredictInterface }) => state.predict);

  const handleReload = () => {
    // window.location.reload()
  }

  return (
    <div className={styles.finishSlider}>
      <div className={styles.finishSliderContainer}>
        <b>ممنون از پاسخگویی شما</b>

        <div>
          <div>
            <b>شانس ویزا </b> : {predict.chance}%
          </div>
          <p></p>
          <div>
            <b> درصد شناخت ویزارد</b> : {predict.potential}%
          </div>
        </div>

        <div>
          <button onClick={handleReload} className={styles.startButton}>شروع دوباره</button>
        </div>
      </div>
    </div>
  );
}
