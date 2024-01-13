import Image from "next/image";
import styles from "./NamePopup.module.css";

export default function NamePopup({ namePopup, setNamePopup, handleClick }) {
  return (
    <>
      {namePopup && (
        <div onClick={() => setNamePopup(false)} className={styles.closePopupLayout}></div>
      )}
      <div className={namePopup ? styles.namePopup : styles.namePopupNot}>
        <div className={styles.namePopupBox}>
          <p>برای شروع یک نام انتخاب کنید</p>
          <input className={styles.nameInput} type="text" placeholder="نام" />
          <button onClick={handleClick} className={styles.submitButton}>
            شروع بررسی
            <Image src="forward-arrow.svg" width="30" height="30" alt="arrow" />
          </button>
        </div>
      </div>
    </>
  );
}
