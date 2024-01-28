import { setToStart } from "@/store/features/sliderSlice";
import styles from "./Navbar.module.css";
import ButtonComponent from "./utils/button/ButtonComponent";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineArrowLeft } from "react-icons/ai";
import AboutModal from "./utils/modal/AboutModal";

interface SliderInterface {
  name: number;
}

export default function Navbar() {

  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <div className={styles.headerContentBox}>
          <img src="/visaland-logo.svg" alt="logo" />
          <img src="/arrow-nav.svg" alt="arrow-nav" />
          <p>اولین هوش مصنوعی ویزا</p>
        </div>

        <div className={styles.headerContentButton}>
          {/* <AboutModal /> */}

          <a href="https://visaland.org">
            <button style={{ fontSize: "16px" }}>
              وبسایت ویزالند
              <AiOutlineArrowLeft style={{ fontSize: "12px" }} />
            </button>
          </a>
        </div>
      </div>
    </header>
  );
}
