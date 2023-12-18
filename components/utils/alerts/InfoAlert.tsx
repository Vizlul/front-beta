import styles from "./InfoAlert.module.css"

export default function InfoAlert() {
  return (
    <div className={styles.infoAlertBox}>
      <img src="InfoIcon.svg" alt="icon" />
      <p>جهت محاسبه پارامترها به اولین سوال پاسخ دهید</p>
    </div>
  );
}
