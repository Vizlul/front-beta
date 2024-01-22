"use client";
import { useDispatch, useSelector } from "react-redux";
import styles from "./page.module.css";
import { SliderState } from "@/constants";
import StartingSlider from "@/components/home/StartingSlider";
import MainSlider from "@/components/home/MainSlider";
import FinishSlider from "@/components/home/FinishSlider";
import { useEffect, useState } from "react";
import StartingSliderMobile from "@/components/home/mobile/StartingSliderMobile";
import MainSliderMobile from "@/components/home/mobile/MainSliderMobile";

interface SliderInterface {
  name: number;
}

export default function Home() {
  const dispatch = useDispatch();
  const slider = useSelector((state: { slider: SliderInterface }) => state.slider);
  const [isMobile, setIsMobile] = useState(false);

  return isMobile ? (
    <div className={styles.mainLayout}>
      {slider.name === SliderState.START ? (
        <StartingSliderMobile />
      ) : slider.name === SliderState.MAIN || slider.name === SliderState.FINISHED ? (
        <MainSliderMobile />
      ) : (
        ""
      )}
    </div>
  ) : (
    <div className={styles.mainLayout}>
      {slider.name === SliderState.START ? (
        <MainSlider />
        ) : slider.name === SliderState.MAIN ? (
        <StartingSlider />
      ) : slider.name === SliderState.FINISHED ? (
        <FinishSlider />
      ) : (
        ""
      )}
    </div>
  );
}
