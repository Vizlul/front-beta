import { useSelector } from "react-redux";
import styles from "./Footer.module.css";

interface SliderInterface {
  name: number;
}

export default function Footer() {
  const slider = useSelector((state: { slider: SliderInterface }) => state.slider);


  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        <div className={styles.footerContent}>
          <img src="/visaland.svg" />
          <div className={styles.footerContentText}>
            <p>قدرت گرفته از ویزالند</p>
            <p>تمامی حقوق مادی و معنوی تکنولوژی ویزارد متعلق به ویزالند است..</p>
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
        {slider.name === 0 && <p className={styles.textVersion}>vizard_v[0.1.0]_front_v[0.1.0]_09ff528</p>}
      </div>
    </footer>
  );
}
