import Image from "next/image";
import styles from "./NamePopup.module.css";

export default function NamePopup({ namePopup, setNamePopup, handleClick, setName, name }) {
  return (
    <>
      {namePopup && (
        <div onClick={() => setNamePopup(false)} className={styles.closePopupLayout}></div>
      )}
      <div className={namePopup ? styles.namePopup : styles.namePopupNot}>
        <div className={styles.namePopupBox}>
          <p>برای شروع یک نام انتخاب کنید</p>
          <input
            style={{ fontSize: "18px" }}
            className={styles.nameInput}
            type="text"
            placeholder="نام"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
          <button disabled={!name} onClick={handleClick} className={styles.submitButton}>
            شروع بررسی
            <Image src="forward-arrow.svg" width="30" height="30" alt="arrow" />
          </button>
        </div>
      </div>
    </>
  );
}
