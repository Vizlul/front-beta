import React from "react";
import styles from "./AboutModal.module.css";

export default function AboutModal() {
  return (
    <div>
      <label
        className={`${styles.buttonAbout} add-counter`}
        style={{ display: "flex", alignItems: "center", gap: "4px" }}
        htmlFor={`modal-1`}
      >
        درباره ویزارد
      </label>

      <input className="modal-state" id={`modal-1`} type="checkbox" />
      <div className="modal">
        <div className={styles.startingSlider}>
          <div>
            <div className={styles.startingSliderRight}>
              <div className={styles.startingSliderRightHeading}>
                <p>ویزارد</p>
                <p>اولین هوش مصنوعی ویزا</p>
              </div>
              <div className={styles.startingSliderRightContent}>
                <p>
                  می دانید چقدر برای اخذ ویزا شانس دارید؟ ویزارد هوش مصنوعی ویزالند است که تحت آموزش با تجربه ترین
                  کارشناسان و بررسی صد ها پرونده موفق و ناموفق ویزا، تبدیل به یک مشاور قدرتمند ویزا شده است.
                </p>
                <p style={{ textDecoration: "underline" }}>
                  همین حالا می توانید با ویزارد گفتگو و شرایط پرونده خود را موشکافانه بررسی کنید.
                </p>
              </div>
              <label className="modalButton modal__close" htmlFor={`modal-1`}>
                متوجه شدم
              </label>
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
