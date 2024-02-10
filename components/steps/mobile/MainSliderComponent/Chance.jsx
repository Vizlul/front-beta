import { useSelector } from "react-redux";
import CountUp from "react-countup";
import styles from "./Chance.module.css";

export default function Chance({ chanceHistory }) {
  const predict = useSelector((state) => state.predict);
  function isNumberIncreasing(previousNumber, currentNumber) {
    return currentNumber > previousNumber
      ? "more"
      : currentNumber < previousNumber
      ? "low"
      : currentNumber === previousNumber
      ? "equal"
      : "";
  }

  return (
    <div className={styles.chance}>
      <img src="visaland-logo2.svg" alt="visaland-logo" />
      <div>
        <p>شانس اخذ ویزا</p>
        <p>
          {isNumberIncreasing(
            chanceHistory[chanceHistory.length - 2]?.chance,
            chanceHistory[chanceHistory.length - 1]?.chance
          ) === "more" ? (
            <img src="/CaretUp.svg" alt="icon" />
          ) : isNumberIncreasing(
              chanceHistory[chanceHistory.length - 2]?.chance,
              chanceHistory[chanceHistory.length - 1]?.chance
            ) === "low" ? (
            <img
              src="/CaretDown.svg"
              style={{
                color: "red",
                transform: "translate(rotate(-180deg))",
              }}
              alt="icon"
            />
          ) : (
            <img src="/CaretEqual.svg" alt="icon" />
          )}
        </p>
        {predict.chance === 0 ? (
          <p className={styles.chanceBoxUnknown}>نامشخص</p>
        ) : (
          <p className={predict.chance > 50 ? styles.chanceBoxGreen : styles.chanceBoxRed}>
            <CountUp
              start={chanceHistory.length > 0 ? chanceHistory[chanceHistory.length - 1].chance : 0}
              end={predict.chance}
            />
            %
          </p>
        )}
      </div>
    </div>
  );
}
