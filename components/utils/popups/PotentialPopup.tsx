import styles from "./ChancePopup.module.css";

export default function PotentialPopup({ chancePopup, setChancePopup }) {
  return (
    <>
      {chancePopup && (
        <div onClick={() => setChancePopup(false)} className={styles.closePopupLayout}></div>
      )}
      <div className={chancePopup ? styles.answerPopup : styles.answerPopupNot}>
        <div className={`${styles.footerTopChance} ${chancePopup ? styles.stickyOnTop : ""} `}>
          <p>شناخت ویزارد از شما</p>
          <p>0%</p>
        </div>
        <ul className={styles.chancePopupLists}>
          <li>در این باکس میزان شناخت هوش مصنوعی ویزارد از شما به درصد نمایش داده می‌شود.</li>
          <li>میزان پر بودن خط جلو این باکس نشانگر همین موضوع است.</li>
          <li>هر چه این عدد بیشتر باشد شانس تخمین زده شده دقیق‌تر می‌باشد.</li>
        </ul>
        <button onClick={() => setChancePopup(false)} className={styles.closeButton}>
          متوجه شدم
        </button>
      </div>
    </>
  );
}
