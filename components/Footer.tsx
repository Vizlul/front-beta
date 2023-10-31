import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        <div className={styles.footerContent}>
          <img src="/visaland.svg" />
          <div className={styles.footerContentText}>
            <p>قدرت گرفته از ویزالند</p>
            <p>تمامی حقوق مادی و معنوی این تکونولوژی (ویزارد) متعلق به ویزالند می‌باشد.</p>
          </div>
        </div>

        <div className={styles.footerSocial}>
          <a href="">
            <img src="/Linkedin.svg" />
          </a>
          <a href="">
            <img src="/Instagram.svg" />
          </a>
        </div>
      </div>
    </footer>
  );
}
