import { PredictInterface } from "@/store/features/predictSlice";
import { useSelector } from "react-redux";
import styles from "./FinishSlider.module.css";
import VideoPlayer from "../VideoPlayer";

export default function FinishSlider() {
  const predict = useSelector((state: { predict: PredictInterface }) => state.predict);

  const handleReload = () => {
    // window.location.reload()
  }

  return (
    <div className={styles.finishSlider}>
      <VideoPlayer />
    </div>
  );
}
