import { ColorCalc } from "@/utils/ChanceColors";
import ButtonComponent from "../../button/ButtonComponent";
import styles from "./SimilarDocsPopupDesktop.module.css";
import { InformationIcon } from "@/components/shared/InformationIcon";

export default function SimilarDocsPopupDesktop({
  contactUs,
  setContatcUs,
  setOpenSimilarDocsPopup,
  chance,
  similarDocsData,
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
            <ButtonComponent
              title="تماس با ویزالند"
              width="100%"
              height="56px"
              background="#00554e"
              color="#fff"
              fontSize="18px"
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
                <div style={{ "--progress-axis": `${chance}%` }} className={styles.signAxisActive}>
                  <div
                    style={{
                      border: `1px solid ${ColorCalc(chance).color}`,
                      background: ColorCalc(chance).bg,
                      color: ColorCalc(chance).color,
                    }}
                  >
                    {chance}%
                  </div>
                  <div style={{ background: ColorCalc(chance).color }}></div>
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
                      {similarDocsData.map((item, index) => (
                        <tr key={index}>
                          <td className={styles.userName}>
                            {item.first_name} {item.last_name}
                          </td>
                          <td>{Math.round(Number(item.acceptance_rate) * 100)}%</td>
                          <td style={{ color: item.acceptance_status ? "green" : "red" }}>
                            {item.acceptance_status ? "پذیرفته شده" : "ریجکت شده"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className={styles.info}>
                  <div
                    style={{
                      border: `1px solid ${ColorCalc(chance).color}`,
                      backgroundColor: ColorCalc(chance).bg,
                    }}
                    className={styles.guide}
                  >
                    <InformationIcon chance={chance} />
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
