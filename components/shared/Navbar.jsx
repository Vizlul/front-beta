import styles from "./Navbar.module.css";
import ButtonComponent from "../shared/button/ButtonComponent.jsx";
import AboutModal from "./popups/desktop/AboutModal.jsx";

export default function Navbar() {
  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <div className={styles.headerContentBox}>
          <img src="/visaland-logo.svg" alt="logo" />
          <img src="/arrow-nav.svg" alt="arrow-nav" />
          <p>هوش مصنوعی ویزارد</p>
        </div>

        <div className={styles.headerContentButton}>
          {/* <AboutModal /> */}

          <a href="https://visaland.org">
            <ButtonComponent
              width="160px"
              height="50px"
              fontSize="18px"
              title="وبسایت ویزالند"
              icon={<img style={{ width: "10px", height: "10px" }} src="forward-arrow.svg" alt="icon" />}
            ></ButtonComponent>
          </a>
        </div>
      </div>
    </header>
  );
}
