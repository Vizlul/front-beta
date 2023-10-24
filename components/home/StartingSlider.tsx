import { setToMain } from "@/store/features/sliderSlice";
import ButtonComponent from "../utils/button/ButtonComponent";
import styles from "./StartingSlider.module.css";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useEffect } from "react";
import { fetchPredictData, setPredictData } from "@/store/features/predictSlice";

export default function StartingSlider() {
  const dispatch = useDispatch();
  const predict = useSelector((state: { predict }) => state.predict);
  const handleClick = () => {
    dispatch(setToMain());
  };

  useEffect(() => {
    dispatch(fetchPredictData())
  }, []);

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
              ویزارد، یک سیستم مشاوره هوشمند مبتنی بر هوش مصنوعیه که به شما در ویزا گرفتن کمک میکنه. این مدل هوش مصنوعی، علاوه بر احتمال
              ویزا شدن، تحلیل علل و فاکتورهای اثر گذار رو نیز در اختیارتون قرار میده.
            </p>
          </div>
          <ButtonComponent
            title="شروع"
            size="large"
            background="#00554e"
            color="#fff"
            onClickFunc={handleClick}
            icon={<AiOutlineArrowLeft />}
          />
        </div>
        <div className={styles.startingSliderLeft}>
          <img src="/vizardsec.png" />
        </div>
      </div>
    </div>
  );
}
