"use client";
import { useDispatch, useSelector } from "react-redux";
import styles from "./page.module.css";
import { SliderState } from "@/constants";
import StartingSlider from "@/components/steps/StartingSlider";

import { useState } from "react";
import StartingSliderMobile from "@/components/steps/mobile/StartingSliderMobile";

import MainSlider from "@/components/steps/MainSlider";
import FinishSlider from "@/components/steps/FinishSlider";
import MainSliderMobile from "@/components/steps/mobile/MainSliderMobile";

export default function Home() {
  const dispatch = useDispatch();
  const slider = useSelector((state) => state.slider);
  const [isMobile, setIsMobile] = useState(true);

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
        <StartingSlider />
      ) : slider.name === SliderState.MAIN ? (
        <MainSlider />
      ) : (
        ""
      )}
    </div>
  );
}
