import { setToMain } from "@/store/features/sliderSlice";
import ButtonComponent from "../utils/button/ButtonComponent";
import styles from "./StartingSlider.module.css";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useEffect } from "react";
import { setPredictData } from "@/store/features/predictSlice";
import CallApi from "@/utils/CallApi";

interface PredictObjectInterface {
  predictData: object;
  chance: number;
  loading: boolean;
  error: any;
}

export default function StartingSlider() {
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(setToMain());
  };

  return (
    <div className={styles.startingSlider}>
      <div>
        <div className={styles.startingSliderRight}>
          <div className={styles.startingSliderRightHeading}>
            <p>ویزارد</p>
            <p>اولین هوش مصنوعی ویزا</p>
          </div>
          <div className={styles.startingSliderRightContent}>
            <p>
              می دانید چقدر برای اخذ ویزا شانس دارید؟ ویزارد هوش مصنوعی ویزالند است که تحت آموزش با
              تجربه ترین کارشناسان و بررسی صد ها پرونده موفق و ناموفق ویزا، تبدیل به یک مشاور
              قدرتمند ویزا شده است.
            </p>
            <p style={{ textDecoration: "underline" }}>
              همین حالا می توانید با ویزارد گفتگو و شرایط پرونده خود را موشکافانه بررسی کنید.
            </p>
          </div>
          <button className={styles.startButton} onClick={handleClick}>
            شروع <AiOutlineArrowLeft />
          </button>
        </div>
        <div className={styles.startingSliderLeft}>
          <img src="/vizardsec.png" />
        </div>
      </div>
    </div>
  );
}
