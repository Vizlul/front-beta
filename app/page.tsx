"use client";
import { useDispatch, useSelector } from "react-redux";
import styles from "./page.module.css";
import { SliderState } from "@/constants";
import StartingSlider from "@/components/home/StartingSlider";
import MainSlider from "@/components/home/MainSlider";
import FinishSlider from "@/components/home/FinishSlider";

interface SliderInterface {
  name: number;
}

export default function Home() {
  const dispatch = useDispatch();
  const slider = useSelector((state: { slider: SliderInterface }) => state.slider);
  return (
    <div className={styles.mainLayout}>
      {slider.name === SliderState.START ? (
        <StartingSlider />
        ) : slider.name === SliderState.MAIN ? (
          <MainSlider />
      ) : slider.name === SliderState.FINISHED ? (
        <FinishSlider />
      ) : (
        ""
      )}
    </div>
  );
}