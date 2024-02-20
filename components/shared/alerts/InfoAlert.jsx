import { useState } from "react";
import styles from "./InfoAlert.module.css";

export default function InfoAlert({ questionCounter, desktop, setShowAlert }) {
  const [fadeOut, setFadeOut] = useState(false);

  const handleClose = () => {
    setFadeOut(true);
    setTimeout(() => setShowAlert(false), 1000); // adjust the time to match your CSS animation duration
  };

  return (
    <div
      className={`${styles.infoAlertBox} ${fadeOut ? styles.fadeOut : ""}`}
      style={{ width: desktop && "80%" }}
    >
      <img src="InfoIcon.svg" alt="icon" />
      {questionCounter === 1 ? (
        <p>جهت محاسبه پارامترها به اولین سوال پاسخ دهید </p>
      ) : (
        <p>جدول‌های زیر نمایانگر پارامترهای موثر بر شانس می‌باشند.</p>
      )}
      <img onClick={() => handleClose()} src="close.svg" alt="icon" />
    </div>
  );
}
