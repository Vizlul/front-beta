import { setToMain } from "@/store/features/sliderSlice";
import ButtonComponent from "../utils/button/ButtonComponent";
import styles from "./StartingSlider.module.css";
import { useDispatch } from "react-redux";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useEffect, useRef, useState } from "react";
import { setPredictData } from "@/store/features/predictSlice";
import CallApi from "@/utils/CallApi";
import Navbar from "../Navbar";
import Footer from "../Footer";

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

  const containerRef = useRef(null);
  const [visibleElements, setVisibleElements] = useState([]);

  useEffect(() => {
    const container = containerRef.current;

    const handleIntersection = (entries) => {
      const visibleElements = entries
        .filter((entry) => entry.isIntersecting)
        .map((entry) => entry.target);

      setVisibleElements(visibleElements);
    };

    const observer = new IntersectionObserver(handleIntersection, {
      root: container,
      rootMargin: "0px",
      threshold: 0.5, // Adjust this threshold based on your needs
    });

    const elements = container.querySelectorAll(".highwayCar, .highwayCarSecond");
    elements.forEach((element) => observer.observe(element));

    return () => {
      observer.disconnect();
    };
  }, []);

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
              <input placeholder="نام" />
              <button onClick={handleClick}>
                شروع بررسی <img src="forward-arrow.svg" alt="icon" />
              </button>
            </div>
          </div>
        </div>
        <div className={styles.mainHeroLeft}>
          <img src="visard-character.svg" alt="vizard" />
          <div className={styles.absoluteBox}>
            <p className={styles.absoluteText}>ویزارد</p>
          </div>
        </div>

        <div className={styles.floatUsersBox}>
          <section className={styles.slideOption}>
            <div ref={containerRef} className={`${styles.highwaySlider} ${styles.infinite}`}>
              {Array.from({ length: 2 }, (_, ind) => (
                <div key={ind} className={`${styles.highwayBarrier} ${styles.infinite}`}>
                  <ul className={styles.highwayLane}>
                    {Array.from({ length: 70 }, (_, index) => (
                      <li
                        className={ind === 0 ? styles.highwayCar : styles.highwayCarSecond}
                        style={{ display: "flex", alignItems: "center", gap: "10px" }}
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
