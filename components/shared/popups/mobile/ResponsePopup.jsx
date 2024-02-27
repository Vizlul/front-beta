import ButtonComponent from "../../button/ButtonComponent";
import styles from "./ResponsePopup.module.css";

export default function ResponsePopup({ responseExplain, setResponsePopup, responsePopup }) {
  console.log(responseExplain);
  console.log(responsePopup);
  return (
    <div className={styles.popupLayout}>
      <div className={styles.popup}>
        {responseExplain[responsePopup]?.length > 0 ? (
          responseExplain[responsePopup]?.map((item, index) => (
            <div key={index}>
              {item.good_influence ? <img src="/CaretUp.svg" /> : <img src="/CaretDown.svg" />}
              {item.txt}
            </div>
          ))
        ) : (
          <div>برای مشاوره به سوالات بیشتری پاسخ دهید</div>
        )}

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
