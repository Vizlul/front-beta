import styles from "./Navbar.module.css";
import ButtonComponent from "../shared/button/ButtonComponent.jsx";
import { AiOutlineArrowLeft } from "react-icons/ai";
import AboutModal from "../shared/popups/AboutModal.jsx";

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
            <ButtonComponent
              title="وبسایت ویزالند"
              icon={<AiOutlineArrowLeft style={{ fontSize: "12px" }} />}
            ></ButtonComponent>
          </a>
        </div>
      </div>
    </header>
  );
}
