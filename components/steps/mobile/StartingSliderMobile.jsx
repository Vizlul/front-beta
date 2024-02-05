import { useDispatch } from "react-redux";
import styles from "./StartingSliderMobile.module.css";
import { setToMain } from "@/store/features/sliderSlice";
import { useEffect, useState } from "react";
import NamePopup from "../../shared/popups/NamePopup";

export default function StartingSliderMobile() {
  const [namePopup, setNamePopup] = useState(false);
  const dispatch = useDispatch();

  const handleClick = () => {
    setNamePopup(false);
    dispatch(setToMain());
  };

  return (
    <div>
      <div className={styles.header}>
        <div>
          <img src="visaland-logo.svg" alt="logo" />
        </div>
      </div>
      <div className={styles.main}>
        <div className={styles.imageBox}>
          <img src="visard-character.svg" alt="visard-character" />
          <div className={styles.absoluteBox}>
            <p className={styles.absoluteText}>ویزارد</p>
          </div>
        </div>
        <p>اولین هوش مصنوعی ویزا</p>
        <p>
          ویزارد به شما کمک میکند قبل از اقدام برای ویزا شانس خود را تخمین بزنید و آن را بهبود دهید.
        </p>
      </div>
      <section className={styles.slideOption}>
        <div className={`${styles.highwaySlider} ${styles.infinite}`}>
          {Array.from({ length: 2 }, (_, ind) => (
            <div key={ind} className={`${styles.highwayBarrier} ${styles.infinite}`}>
              <ul className={styles.highwayLane}>
                {Array.from({ length: 70 }, (_, index) => (
                  <li
                    className={ind === 0 ? styles.highwayCar : styles.highwayCarSecond}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <span className={styles.progressUserName}>مریم رادمنش</span>
                    <span className={styles.progressUsers}>
                      40<span>%</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
      <div className={styles.footer}>
        <button onClick={() => setNamePopup(true)}>
          شروع بررسی <img src="forward-arrow.svg" alt="forward-arrow" />
        </button>
      </div>

      <NamePopup handleClick={handleClick} namePopup={namePopup} setNamePopup={setNamePopup} />
    </div>
  );
}
