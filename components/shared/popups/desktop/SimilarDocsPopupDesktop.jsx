import ButtonComponent from "../../button/ButtonComponent";
import styles from "./SimilarDocsPopupDesktop.module.css";

export default function SimilarDocsPopupDesktop({
  contactUs,
  setContatcUs,
  setOpenSimilarDocsPopup,
}) {
  return (
    <>
      {contactUs ? (
        <div style={{ width: "calc(100% - 740px)" }} className={styles.popup}>
          <div className={styles.header}>
            <p>دریافت مشاوره جهت اخذ ویزا</p>
            <img
              style={{ cursor: "pointer" }}
              onClick={() => {
                setOpenSimilarDocsPopup(false);
                setContatcUs(false);
              }}
              src="close.svg"
              alt="close"
            />
          </div>
          <p style={{ color: "rgba(0, 12, 10, 0.8)", fontSize: "20px" }}>
            جهت دریافت مشاوره و اقدام برای ویزا با ما تماس بگیرید.
          </p>
          <div className={styles.buttonGroups}>
            <ButtonComponent
              title="تماس با ویزالند"
              width="100%"
              height="56px"
              background="#00554e"
              color="#fff"
              fontSize="18px"
            />
            <ButtonComponent
              title="33143 026"
              width="100%"
              height="56px"
              color="#00554e"
              background="#fff"
              fontWeight="bold"
              icon={<img src="phone-icon.svg" alt="phone" />}
              fontSize="18px"
              onClickFunc={() => window.open("tel:02633143")}
            />
          </div>
        </div>
      ) : (
        <div className={styles.popup}>
          <div className={styles.header}>
            <p>پرونده‌های مشابه شما</p>
            <img
              style={{ cursor: "pointer" }}
              onClick={() => setOpenSimilarDocsPopup(false)}
              src="close.svg"
              alt="close"
            />
          </div>
          <div className={styles.content}>
            <div className={styles.textAxisBox}>
              <p>نمودار زیر نمایانگر تخمین شانس ویزای شما می‌باشد.</p>
              <div className={styles.axis}>
                <div style={{ "--progress-axis": "50%" }} className={styles.signAxisActive}>
                  <div>20%</div>
                  <div></div>
                </div>
                <div className={styles.signAxisStart}>0</div>
                <div className={styles.signAxisHalf}>50</div>
                <div className={styles.signAxisEnd}>100</div>
              </div>
              <p>
                جدول زیر نمایانگر شانس و وضعیت ویزا مسافران ویزالند با درصد شانس مشابه شما می‌باشد.
                (جهت حفظ حریم خصوصی نام کاربران مخفی شده است)
              </p>
              <div className={styles.tableInfoBox}>
                <div>
                  <p></p>
                </div>
                <div className={styles.table}>
                  <table className={styles.table}>
                    <thead>
                      <tr>
                        <th>نام مسافر</th>
                        <th>شانس</th>
                        <th>وضعیت ویزا</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>کاربر مشابه یک</td>
                        <td>20%</td>
                        <td>ریجکت شده</td>
                      </tr>
                      <tr>
                        <td>کاربر مشابه یک</td>
                        <td>22%</td>
                        <td>ریجکت شده</td>
                      </tr>
                      <tr>
                        <td>کاربر مشابه یک</td>
                        <td>16%</td>
                        <td>ریجکت شده</td>
                      </tr>
                      <tr>
                        <td>کاربر مشابه یک</td>
                        <td>25%</td>
                        <td>پذیرفته شده</td>
                      </tr>
                      <tr>
                        <td>کاربر مشابه یک</td>
                        <td>18%</td>
                        <td>ریجکت شده</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className={styles.info}>
                  <div className={styles.guide}>
                    <img src="InformationIcon.svg" alt="Information" />
                    <p>
                      شانس شما برای اخذ ویزا بسیار کم است، پیشنهاد می‌کنیم جهت بهبود پارامترهای
                      تاثیرگذار در شانس خود اقدام نمایید
                    </p>
                  </div>
                  <ButtonComponent
                    title="دریافت مشاوره"
                    background="#00554e"
                    color="#fff"
                    width="100%"
                    height="56px"
                    onClickFunc={() => setContatcUs(true)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
