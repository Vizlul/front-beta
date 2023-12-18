import { useDispatch } from "react-redux";
import styles from "./StartingSliderMobile.module.css";
import { setToMain } from "@/store/features/sliderSlice";

export default function StartingSliderMobile() {
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(setToMain());
  };

  return (
    <div>
      <div className={styles.header}>
        <div>
          <img src="visaland-logo.svg" alt="logo" />
          <p>هوش مصنوعی ویزارد</p>
        </div>
      </div>
      <div className={styles.main}>
        <img src="visard-character.svg" alt="visard-character" />
        <p>اولین هوش مصنوعی ویزا</p>
        <p>
          متن درباره ویزارد در این قسمت قرار می‌گیرد. لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم
          از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون
          و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف
          بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده.
        </p>
      </div>
      <div className={styles.footer}>
        <button onClick={handleClick}>
          شروع بررسی <img src="forward-arrow.svg" alt="forward-arrow" />
        </button>
      </div>
    </div>
  );
}
