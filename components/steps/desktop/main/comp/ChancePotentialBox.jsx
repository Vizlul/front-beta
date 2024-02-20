import { useSelector } from "react-redux";
import styles from "./ChancePotentialBox.module.css";
import ProgressBar from "@/components/shared/ProgressBar";

export default function ChancePotentialBox({
  setChancePotentialPopup,
  chanceHistory,
  isNumberIncreasing,
}) {
  const predict = useSelector((state) => state.predict);

  return (
    <div className={styles.chancePotentialBox} style={{ maxHeight: "310px" }}>
      <div
        className={styles.chanceBox}
        style={{ height: "100%" }}
        onClick={() =>
          setChancePotentialPopup({
            value: true,
            type: "chance",
          })
        }
      >
        <p>شانس ویزا</p>
        <ProgressBar
          isNumberIncreasing={isNumberIncreasing}
          chanceHistory={chanceHistory}
          number={predict.chance}
          type="chance"
        />
      </div>

      <div
        className={styles.potentialBox}
        style={{ height: "100%" }}
        onClick={() =>
          setChancePotentialPopup({
            value: true,
            type: "potential",
          })
        }
      >
        <p>شناخت ویزارد از شما</p>
        <ProgressBar
          isNumberIncreasing={isNumberIncreasing}
          chanceHistory={chanceHistory}
          number={predict.potential}
          type="potential"
        />
      </div>
    </div>
  );
}
