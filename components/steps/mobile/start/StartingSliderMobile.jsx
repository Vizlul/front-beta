import { useDispatch } from "react-redux";
import styles from "./StartingSliderMobile.module.css";
import { setToMain } from "@/store/features/sliderSlice";
import { useEffect, useState } from "react";
import NamePopup from "@/components/shared/popups/mobile/NamePopup";
import { ColorCalc } from "@/utils/ChanceColors";
import Image from "next/image";

export default function StartingSliderMobile({ setName, name }) {
  const [namePopup, setNamePopup] = useState(false);
  const dispatch = useDispatch();
  const [users, setUsers] = useState([]);

  const handleClick = () => {
    setNamePopup(false);
    dispatch(setToMain());
  };

  const getUsers = async () => {
    await fetch(`/api/user-chance`).then(async (res) => {
      const { data } = await res.json();
      while (data.length < 70) {
        data.push(...data);
      }
      setUsers(data.slice(0, 70));
    });
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div>
      <div className={styles.header}>
        <div>
          <Image
            width={200}
            height={200}
            className={styles.logo}
            src="visaland-logo.svg"
            alt="logo"
          />
        </div>
      </div>
      <div className={styles.main}>
        <div className={styles.imageBox}>
          <Image
            width={200}
            height={200}
            className={styles.vizard}
            src="visard-character.svg"
            alt="visard-character"
          />
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
                {users.map((item, index) => (
                  <li
                    key={index}
                    className={ind === 0 ? styles.highwayCar : styles.highwayCarSecond}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <span className={styles.progressUserName}>{item.name}</span>
                    <span
                      style={{
                        border: `1px solid ${ColorCalc(item.chance).color}`,
                        color: ColorCalc(item.chance).color,
                        background: ColorCalc(item.chance).bg,
                      }}
                      className={styles.progressUsers}
                    >
                      {item.chance}
                      <span>%</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}{" "}
        </div>
      </section>
      <div className={styles.footer}>
        <button onClick={() => setNamePopup(true)}>
          شروع بررسی <img src="forward-arrow.svg" alt="forward-arrow" />
        </button>
      </div>

      <NamePopup
        handleClick={handleClick}
        namePopup={namePopup}
        setNamePopup={setNamePopup}
        setName={setName}
        name={name}
      />
    </div>
  );
}
