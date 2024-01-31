import { useSelector } from "react-redux";
import styles from "./Footer.module.css";

export default function Footer() {
  const slider = useSelector((state) => state.slider);

  return (
    <footer className={styles.footer}>
      <div className={styles.footerRight}>
        <p>قدرت گرفته از ویزالند</p>
        <p>تمامی حقوق مادی و معنوی تکنولوژی ویزارد متعلق به ویزالند است.</p>
      </div>
      <div className={styles.footerLeft}>
        <img src="instagram.svg" alt="social-icon" />
        <img src="linkedin.svg" alt="social-icon" />
      </div>
    </footer>
  );
}
