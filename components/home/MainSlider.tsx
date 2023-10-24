import { Progress } from "antd";
import MyChart from "../utils/chart/Chart";
import SliderComponent from "../utils/slider/SliderComponent";
import styles from "./MainSlider.module.css"
import NumberCounterAnimate from "@/utils/NumberCounterAnimate";


export default function MainSlider() {
  return (
    <div className={styles.mainSlider}>
      
      <div className={styles.mainSliderRight}>
        <div className={styles.mainSliderRightBox}>
          <SliderComponent />
        </div>
        <div className={styles.mainSliderRightBox}>
          
        </div>
        <div className={styles.mainSliderRightBox}>
            <div className="potansielChanceContainer">
          <div className="potansielChanceBox">
            <div className="potansielChanceBoxHeader">
              <div>
                <p>شانس ویزا</p>
                <span
                  >%
                  {/* <NumberCounter v-model:number="submitPredictStore.chance" /> */}
                  {/* <NumberCounterAnimate number={} /> */}
                </span>
              </div>
              {/* <!-- <InfoCircleOutlined /> --> */}
            </div>

            {/* <a-progress className="progressBar" :percent="submitPredictStore.chance" status="active" :show-info="false" /> */}
            <Progress percent={50} status="active" />
            <div className="potansielChanceBoxFooter">
              <img src="/CaretUp.svg" alt="icon" />
              {/* {{ submitPredictStore.countAnswer }} */}
              {/* {{ questionIndex }} */}
              {/* <p>{{ indexChanges }}</p> */}
              <p>درصد تغییر</p>
            </div>
          </div>
          <div className="potansielChanceBox">
            <div className="potansielChanceBoxHeader">
              <div>
                <p>شناخت ویزارد شما</p>
                <span
                  >%
                  {/* <NumberCounter v-model:number="submitPredictStore.potential" /> */}
                </span>
              </div>
              {/* <!-- <InfoCircleOutlined /> --> */}
            </div>

            {/* <a-progress className="progressBar" :percent="submitPredictStore.potential" status="active" :show-info="false" /> */}
            <Progress percent={50} status="active" />
            <div className="potansielChanceBoxFooter">
              <img src="/CaretUp.svg" alt="icon" />
              <p>نسبت تغییرات</p>
            </div>
          </div>
        </div>
        </div>
      </div>
      <div className={styles.mainSliderLeft}>
        <MyChart />
      </div>
    </div>
            
  )
}
