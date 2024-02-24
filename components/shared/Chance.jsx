import { useState } from "react";
import { useSelector } from "react-redux";
import styles from "./Chance.module.css";
import { ArrowChanceIcon } from "@/components/shared/ArrowChanceIcon";
import { AnimatedCounter } from "react-animated-counter";
import { ColorCalc } from "@/utils/ChanceColors";
import ChancePopup from "@/components/shared/popups/mobile/ChancePopup";

export default function Chance({ chanceHistory }) {
  const predict = useSelector((state) => state.predict);
  const [openPopup, setOpenPopup] = useState(false);

  return (
    <>
      <div className={styles.chance} onClick={() => setOpenPopup(true)}>
        <img src="visaland-logo2.svg" alt="visaland-logo" />
        <div>
          <p>شانس اخذ ویزا</p>
          <p>
            <ArrowChanceIcon
              start={chanceHistory[chanceHistory.length - 2]?.chance}
              end={chanceHistory[chanceHistory.length - 1]?.chance}
            />
          </p>
          <p
            className={
              predict.chance === 0 && chanceHistory.length === 0
                ? styles.chanceBoxUnknown
                : styles.chanceBoxGreen
            }
            style={{
              backgroundColor: ColorCalc(predict.chance).color,
            }}
          >
            {predict.chance === 0 ? (
              "نامشخص"
            ) : (
              <>
                <span>%</span>
                <AnimatedCounter
                  includeDecimals={false}
                  value={predict.chance}
                  color="white"
                  fontSize="22px"
                />
              </>
            )}
          </p>
        </div>
      </div>

      <div className={openPopup ? styles.popup : styles.popupNot}>
        {openPopup && <ChancePopup setOpenPopup={setOpenPopup} chanceHistory={chanceHistory} />}
      </div>
    </>
  );
}
