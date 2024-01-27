import { PredictInterface } from "@/store/features/predictSlice";
import { useSelector } from "react-redux";
import styles from "./FinishSliderPopup.module.css";
import VideoPlayer from "@/components/VideoPlayer";

export default function FinishSliderPopup({ finishPopup }) {
  const predict = useSelector((state: { predict: PredictInterface }) => state.predict);

  const handleReload = () => {
    // window.location.reload()
  };

  return (
    <div className={styles.finishSlider}>
      <VideoPlayer finishPopup={finishPopup} />
    </div>
  );
}
