import { setToMain } from "@/store/features/sliderSlice";
import styles from "./StartingSlider.module.css";
import { useDispatch } from "react-redux";
import Navbar from "../shared/Navbar";
import Footer from "../shared/Footer";
import ButtonComponent from "../shared/button/ButtonComponent.jsx";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function StartingSlider({ name, setName }) {
  const dispatch = useDispatch();
  const [users, setUsers] = useState([]);

  const handleClick = () => {
    dispatch(setToMain());
  };

  return (
    <div className={styles.startingSlider}>
      <Navbar />

      <div className={styles.mainHero}>
        <div className={styles.mainHeroRight}>
          <div className={styles.mainHeroHeader}>
            <p>ویزارد</p>
            <p>اولین هوش مصنوعی ویزا</p>
          </div>

          <p className={styles.mainHeroInfo}>
            ویزارد به شما کمک میکند قبل از اقدام برای ویزا شانس خود را تخمین بزنید و آن را بهبود
            دهید.
          </p>

          <div className={styles.starterMainHero}>
            <p>برای شروع یک نام را انتخاب کنید.</p>

            <div>
              <input
                type="text"
                placeholder="نام"
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
              <ButtonComponent
                title="شروع بررسی"
                icon={<img src="forward-arrow.svg" alt="icon" />}
                onClickFunc={handleClick}
              ></ButtonComponent>
            </div>
          </div>
        </div>

        <div className={styles.mainHeroLeft}>
          <Image width="100" height="100" src="visard-character.svg" alt="vizard" />
          <div className={styles.absoluteBox}>
            <p className={styles.absoluteText}>ویزارد</p>
          </div>
        </div>
        {/* =============== Slider Scroll Animoation Users =============== */}
        <div className={styles.floatUsersBox}>
          <section className={styles.slideOption}>
            <div className={`${styles.highwaySlider} ${styles.infinite}`}>
              {/* =============== two row slider of users =============== */}
              {Array.from({ length: 2 }, (_, ind) => (
                <div key={ind} className={`${styles.highwayBarrier} ${styles.infinite}`}>
                  <ul className={styles.highwayLane}>
                    {/* ================== 70 users repeat in each row ================== */}
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
        </div>
      </div>

      <Footer />
    </div>
  );
}
