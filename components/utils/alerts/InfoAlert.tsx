import styles from "./InfoAlert.module.css";

export default function InfoAlert({ questionCounter }) {
  console.log(questionCounter)
  return (
    <div className={styles.infoAlertBox}>
      <img src="InfoIcon.svg" alt="icon" />
      {questionCounter === 1 ? (
        <p>جهت محاسبه پارامترها به اولین سوال پاسخ دهید </p>
      ) : (
        <p>جدول‌های زیر نمایانگر پارامترهای موثر بر شانس می‌باشند.</p>
      )}
    </div>
  );
}
