import { PredictInterface } from "@/store/features/predictSlice";
import { useSelector } from "react-redux";
import styles from "./FinishSlider.module.css";
import VideoPlayer from "@/components/VideoPlayer";

export default function FinishSlider() {
  const predict = useSelector((state: { predict: PredictInterface }) => state.predict);

  return (
    <div className={styles.finishSlider}>
      <VideoPlayer />
    </div>
  );
}
