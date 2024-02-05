import { useSelector } from "react-redux";
import styles from "./FinishSlider.module.css";
import VideoPlayer from "../shared/VideoPlayer";

export default function FinishSlider() {
  const predict = useSelector((state) => state.predict);

  return (
    <div className={styles.finishSlider}>
      <VideoPlayer />
      <ContactUsPopup />
    </div>
  );
}
