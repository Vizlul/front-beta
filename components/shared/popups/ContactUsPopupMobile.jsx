import ButtonComponent from "@/components/shared/button/ButtonComponent";
import styles from "./ContactUsPopupMobile.module.css";

export default function ContactUsPopupMobile({
  setContactUsPopup,
  setSimilarDocsPopup,
  setFinishPopup,
}) {
  return (
    <div className={styles.popup}>
      <div className={styles.header}>
        <p>دریافت مشاوره اخذ ویزا</p>
        <img onClick={() => setContactUsPopup(false)} src="close.svg" alt="close" />
      </div>
      <p>جهت دریافت مشاوره و اقدام برای ویزا با ما تماس بگیرید.</p>
      <div className={styles.contactInfo}>
        <img src="phone-icon.svg" alt="close" />
        <p>026 33143</p>
      </div>
      <button onClick={() => window.open("tel:02633143")} className={styles.button}>
        تماس با ویزالند
      </button>
      <button
        onClick={() => {
          setSimilarDocsPopup(true);
          setContactUsPopup(false);
          setFinishPopup(false);
        }}
        className={styles.button}
      >
        مشاهده پرونده های مشابه
      </button>
    </div>
  );
}
