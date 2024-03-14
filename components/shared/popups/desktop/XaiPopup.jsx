import { useDispatch, useSelector } from "react-redux";
import styles from "./ChancePotentialModalDesktop.module.css";
import { setChartName } from "@/store/features/chartsSlice";

export default function XaiPopup({ responseExplain }) {
  const charts = useSelector((state) => state.charts);
  const dispatch = useDispatch();
  console.log(charts);

  return (
    <div className={styles.popupBox}>
      <div className={styles.popupHeader}>
        <p>مشاوره</p>
        <img
          style={{ cursor: "pointer" }}
          onClick={() => dispatch(setChartName(""))}
          src="close.svg"
          alt="close"
        />
      </div>
      <div className={styles.progressInfoBox}>
        <div className={styles.items}>
          {responseExplain[charts.name]?.length > 0 ? (
            responseExplain[charts.name]
              ?.filter((item) => !item.txt.includes("جنسیت"))
              .map((el, index) => (
                <div key={index} className={styles.item}>
                  {el.good_influence ? <img src="/CaretUp.svg" /> : <img src="/CaretDown.svg" />}
                  <p>{el.txt}.</p>
                </div>
              ))
          ) : (
            <div className={styles.item}>
              <div></div>
              <p>برای مشاوره به سوالات بیشتری پاسخ دهید</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
