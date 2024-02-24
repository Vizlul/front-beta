import ButtonComponent from "@/components/shared/button/ButtonComponent";
import styles from "./ChancePopup.module.css";
import { ArrowChanceIcon } from "../../ArrowChanceIcon";
import { ColorCalc } from "@/utils/ChanceColors";
import { useSelector } from "react-redux";

export default function ChancePopup({ chanceHistory, setOpenPopup }) {
  const predict = useSelector((state) => state.predict);

  return (
    <div className={styles.popup}>
      <div className={styles.header}>
        <div></div>
        <div className={styles.headerChance}>
          <p>شانس اخذ ویزا</p>
          <ArrowChanceIcon
            start={chanceHistory[chanceHistory.length - 2]?.chance}
            end={chanceHistory[chanceHistory.length - 1]?.chance}
          />
          <p
            className={
              predict.chance === 0 && chanceHistory.length === 0
                ? styles.chanceBoxUnknown
                : styles.chanceBoxGreen
            }
            style={{
              backgroundColor: ColorCalc(predict.chance).color,
            }}
          >
            30%
          </p>
        </div>
      </div>

      <div className={styles.lists}>
        <ul>
          <li>در این باکس شانس اخذ ویزا شما به درصد نمایش داده می‌شود.</li>
          <li>
            برای ارزیابی دقیق‌تر پیشنهاد می‌شود به سوالات بیشتری پاسخ دهید، در هر مرحله شانس ویزا
            شما مجدد محاسبه میشود.
          </li>
          <li>
            علامت <img src="/CaretUp.svg" /> نشانگر تغییر مثبت و علامت <img src="/CaretDown.svg" />{" "}
            نشانگر تغییر منفی و علامت <img src="/CaretEqual.svg" /> نشانگر عدم تغییر شانس نسبت به
            آخرین پاسخ می‌باشد.
          </li>
        </ul>
      </div>

      <ButtonComponent
      onClickFunc={() => setOpenPopup(false)}
        title="متوجه شدم"
        width="100%"
        borderColor="rgba(167, 167, 167, 1)"
        background="rgba(242, 242, 242, 1)"
        color="rgba(72, 72, 72, 1)"
        height="50px"
        fontSize="16px"
      />
    </div>
  );
}
