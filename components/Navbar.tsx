import { setToStart } from "@/store/features/sliderSlice";
import styles from "./Navbar.module.css";
import ButtonComponent from "./utils/button/ButtonComponent";
import { useDispatch, useSelector } from "react-redux";

interface SliderInterface {
  name: number
}

export default function Navbar() {

  const handleReload = () => {
    window.location.reload()
  }

  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <div className={styles.headerContentBox}>
          <div className={styles.headerContentBoxImage} onClick={() => handleReload()}>
            <img src="/vizard.png" />
          </div>
          <div className={styles.headerContentText}>
            <p>ویزارد</p>
            <p>اولین هوش مصنوعی ویزا</p>
          </div>
        </div>

        <div className={styles.headerContentButton}>
          <ButtonComponent title="درباره ویزارد" size="large"></ButtonComponent>
          <ButtonComponent title="وبسایت ویزالند" size="large"></ButtonComponent>
        </div>
      </div>
    </header>
  );
}
