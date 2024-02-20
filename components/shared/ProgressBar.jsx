import styles from "./ProgressBar.module.css";

export default function ProgressBar({ isNumberIncreasing, chanceHistory, number, type, notWidth }) {
  return (
    <div style={{ width: notWidth ? "" : "100%" }} className={styles.progressBar}>
      <svg
        fill="none"
        className={styles.progressFull}
        width="220"
        height="220"
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M100 200L0 200L0 0L200 0L200 200L100 200" strokeWidth="40" />
      </svg>
      <svg
        fill="none"
        className={type === "chance" ? styles.progress : styles.potential}
        width="220"
        height="220"
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M100 200L0 200L0 0L200 0L200 200L100 200" strokeWidth="40" />
      </svg>
      {type === "chance" ? (
        <div className={styles.chanceNumber}>
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
          <p>
            <span>%</span> {number}
          </p>
        </div>
      ) : (
        <div className={styles.potentialNumber}>
          <div className={styles.footerVisHead}>
            <img src="vizard-head.svg" alt="vizard-head" />
          </div>
          <div className={styles.potentialNumberIcon}>
            {isNumberIncreasing(
              chanceHistory[chanceHistory.length - 2]?.potential,
              chanceHistory[chanceHistory.length - 1]?.potential
            ) === "more" ? (
              <img src="/CaretUp.svg" alt="icon" />
            ) : isNumberIncreasing(
                chanceHistory[chanceHistory.length - 2]?.potential,
                chanceHistory[chanceHistory.length - 1]?.potential
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
            <p>
              <span>%</span> {number}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
