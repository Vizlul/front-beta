import ProgressBar from "@/components/shared/ProgressBar";
import styles from "./ChancePotentialModalDesktop.module.css";

export default function ChancePotentialModalDesktop({
  isNumberIncreasing,
  chanceHistory,
  number,
  chancePotentialPopup,
  setChancePotentialPopup,
}) {
  console.log(chancePotentialPopup);

  return (
    <div className={styles.popupBox}>
      <div className={styles.popupHeader}>
        {chancePotentialPopup.type === "chance" ? <p>شانس اخذ ویزا %{number}</p> : <p>شناخت ویزارد از شما</p>}
        <img
          onClick={() =>
            setChancePotentialPopup({
              value: false,
              type: "",
            })
          }
          src="close.svg"
          alt="close"
        />
      </div>
      <div className={styles.progressInfoBox}>
        <ProgressBar
          isNumberIncreasing={isNumberIncreasing}
          chanceHistory={chanceHistory}
          number={number}
          type={chancePotentialPopup.type}
          notWidth={true}
        />
        <div className={styles.items}>
          <div className={styles.item}>
            <div></div>
            {chancePotentialPopup.type === "chance" ? (
              <p>در این باکس شانس اخذ ویزا شما به درصد نمایش داده می‌شود.</p>
            ) : (
              <p>در این باکس میزان شناخت هوش مصنوعی ویزارد از شما به درصد نمایش داده می‌شود.</p>
            )}
          </div>

          <div className={styles.item}>
            <div></div>
            {chancePotentialPopup.type === "chance" ? (
              <p>میزان پر بودن خط جلو این باکس نشانگر همین موضوع است.</p>
            ) : (
              <p>
                برای ارزیابی دقیق‌تر پیشنهاد می‌شود به سوالات بیشتری پاسخ دهید، در هر مرحله شانس ویزا شما مجدد محاسبه
                میشود.
              </p>
            )}
          </div>

          <div className={styles.item}>
            <div></div>
            {chancePotentialPopup.type === "chance" ? (
              <p>هر چه این عدد بیشتر باشد شانس تخمین زده شده دقیق‌تر می‌باشد.</p>
            ) : (
              <p>
                علامت <img src="CaretUp.svg" alt="icon" /> نشانگر تغییر مثبت و علامت{" "}
                <img src="CaretDown.svg" alt="icon" /> نشانگر تغییر منفی و علامت <img src="CaretEqual.svg" alt="icon" />{" "}
                نشانگر عدم تغییر شانس نسبت به آخرین پاسخ می‌باشد.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
