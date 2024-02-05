import ButtonComponent from "@/components/shared/button/ButtonComponent";
import styles from "./ContactUsPopupMobile.module.css";

export default function ContactUsPopupMobile({ setContactUsPopup }) {
  return (
    <div className={styles.popup}>
      <div className={styles.header}>
        <p>دریافت مشاوره اخذ ویزا</p>
        <img onClick={() => setContactUsPopup(false)} src="close.svg" alt="close" />
      </div>
      <p>جهت دریافت مشاوره و اقدام برای ویزا با ما تماس بگیرید.</p>
      <div className={styles.contactInfo}>
        <img src="close.svg" alt="close" />
        <p>026 33143</p>
      </div>
      <button className={styles.button}>تماس با ویزالند</button>
    </div>
  );
}
