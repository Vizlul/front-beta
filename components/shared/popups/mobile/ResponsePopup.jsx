import ButtonComponent from "../../button/ButtonComponent";
import styles from "./ResponsePopup.module.css";

export default function ResponsePopup({ setResponsePopup }) {
  return (
    <div className={styles.popupLayout}>
      <div className={styles.popup}>
        <div>
          <img src="/CaretDown.svg" />
          فلان گزینه خوب است
        </div>
        <div>
          <img src="/CaretDown.svg" />
          فلان گزینه بد است
        </div>
        <div>
          <img src="/CaretUp.svg" />
          لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک
          است
        </div>

        <ButtonComponent
          title="متوجه شدم"
          height="50px"
          width="100%"
          borderColor="#a7a7a7"
          color="#484848"
          fontSize="16px"
          onClickFunc={() => setResponsePopup(false)}
        />
      </div>
    </div>
  );
}
