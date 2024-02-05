import { useSelector } from "react-redux";
import styles from "./FinishSliderPopup.module.css";
import VideoPlayer from "@/components/shared/VideoPlayer";

export default function FinishSliderPopup({ finishPopup, setContactUsPopup }) {
  const predict = useSelector((state) => state.predict);

  return (
    <div className={styles.finishSlider}>
      <VideoPlayer finishPopup={finishPopup} setContactUsPopup={setContactUsPopup} />
    </div>
  );
}
