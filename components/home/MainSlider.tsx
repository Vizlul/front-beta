import MyChart from "../utils/chart/Chart";
import SliderComponent from "../utils/slider/SliderComponent";
import styles from "./MainSlider.module.css"


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
            
        </div>
      </div>
      <div className={styles.mainSliderLeft}>
        <MyChart />
      </div>
    </div>
            
  )
}
