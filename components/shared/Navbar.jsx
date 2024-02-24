import styles from "./Navbar.module.css";
import ButtonComponent from "../shared/button/ButtonComponent.jsx";
import AboutModal from "./popups/desktop/AboutModal.jsx";
import { useState } from "react";

export default function Navbar() {
  const [openAboutModal, setOpenAboutModal] = useState(false);

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
          <ButtonComponent
            width="115px"
            height="50px"
            fontSize="18px"
            title="درباره ویزارد"
            background="#fff"
            color="#303030CC"
            borderColor="#303030CC"
            onClickFunc={() => setOpenAboutModal(true)}
          ></ButtonComponent>

          <a href="https://visaland.org">
            <ButtonComponent
              padding="0 10px"
              width="140px"
              height="50px"
              fontSize="18px"
              title="وبسایت ویزالند"
              icon={
                <img style={{ width: "10px", height: "10px" }} src="forward-arrow.svg" alt="icon" />
              }
            ></ButtonComponent>
          </a>

          {openAboutModal && <AboutModal setOpenAboutModal={setOpenAboutModal} />}
        </div>
      </div>
    </header>
  );
}
