import styles from "./AnswerPopup.module.css";

export default function AnswerPopup({ answerPopup, setAnswerPopup }) {

  return (
    <>
      {answerPopup && (
        <div onClick={() => setAnswerPopup(false)} className={styles.closePopupLayout}></div>
      )}
      <div className={answerPopup ? styles.answerPopup : styles.answerPopupNot}>
        <div className={`${styles.footerTopChance} ${answerPopup ? styles.stickyOnTop : ""} `}>
          <p>شناخت ویزارد از شما</p>
          <p>0%</p>
        </div>
        <div className={styles.answerPopupQuestion}>
          <p>01</p>
          <p>چند سال تو آخرین شغلت، مشغول به کار بودی؟ 🤔</p>
        </div>
        <div className={styles.answerPopupChioces}>
          <button>ترکیه</button>
          <button>گرجستان</button>
          <button>ارمنستان</button>
          <button>امارات</button>
          <button>سایر</button>
        </div>
        <button className={styles.answerPopupSubmitButton}>
          ثبت پاسخ <img src="forward-arrow.svg" alt="arrow-forward" />
        </button>
      </div>
    </>
  );
}
