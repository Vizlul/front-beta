import React from "react";
import styles from "./AboutModal.module.css";
import ButtonComponent from "../../button/ButtonComponent";

export default function AboutModal({ setOpenAboutModal }) {
  return (
    <div onClick={() => setOpenAboutModal(false)} className={styles.popupLayout}>
      <div className={styles.popup}>
        <div className={styles.startingSlider}>
          <div>
            <div className={styles.startingSliderRight}>
              <div className={styles.startingSliderRightHeading}>
                <p>ویزارد</p>
                <p>اولین هوش مصنوعی ویزا</p>
              </div>
              <div className={styles.startingSliderRightContent}>
                <p>
                  می دانید چقدر برای اخذ ویزا شانس دارید؟ ویزارد هوش مصنوعی ویزالند است که تحت آموزش
                  با تجربه ترین کارشناسان و بررسی صد ها پرونده موفق و ناموفق ویزا، تبدیل به یک مشاور
                  قدرتمند ویزا شده است.
                </p>
                <p style={{ textDecoration: "underline" }}>
                  همین حالا می توانید با ویزارد گفتگو و شرایط پرونده خود را موشکافانه بررسی کنید.
                </p>
              </div>
              <ButtonComponent
                title="متوجه شدم"
                width="110px"
                height="50px"
                borderColor="#303030CC"
                background="#fff"
                fontSize="16px"
                onClickFunc={() => setOpenAboutModal(false)}
              />
            </div>
            <div className={styles.startingSliderLeft}>
              <img src="/vizardsec.png" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
