import styles from "./SimilarDocsPopup.module.css";

export default function SimilarDocsPopup({ similarDocsPopup, setSimilarDocsPopup }) {
  return (
    <div className={styles.box}>
      <div className={styles.headerBox}>
        <p>پرونده‌های مشابه شما</p>
        <img onClick={() => setSimilarDocsPopup(false)} src="close.svg" alt="close" />
      </div>

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
        <p>جدول زیر نمایانگر شانس و وضعیت ویزا مسافران ویزالند با درصد شانس مشابه شما می‌باشد.</p>
      </div>

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
      <p>جهت حفظ حریم خصوصی نام کاربران مخفی شده است.</p>

      <div className={styles.guide}>
        <img src="InformationIcon.svg" alt="Information" />
        <p>شانس شما برای اخذ ویزا بسیار کم است، پیشنهاد می‌کنیم جهت بهبود پارامترهای تاثیرگذار در شانس خود اقدام نمایید</p>
      </div>

      <button className={styles.button}>دریافت مشاوره</button>
    </div>
  );
}
