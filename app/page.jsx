"use client";
import { useDispatch, useSelector } from "react-redux";
import styles from "./page.module.css";
import { SliderState } from "@/constants";
import StartingSlider from "@/components/steps/desktop/StartingSlider";

import { useEffect, useState } from "react";
import StartingSliderMobile from "@/components/steps/mobile/StartingSliderMobile";
import TourProviderCustom from "../components/shared/TourProviderCustom"
import MainSlider from "@/components/steps/desktop/MainSlider";
import FinishSlider from "@/components/steps/desktop/FinishSlider";
import MainSliderMobile from "@/components/steps/mobile/MainSliderMobile";

export default function Home() {
  const dispatch = useDispatch();
  const slider = useSelector((state) => state.slider);
  const [isMobile, setIsMobile] = useState(true);
  const [name, setName] = useState("");

  useEffect(() => {
    setIsMobile(window.innerWidth > 768 ? false : true);
  }, []);

  return isMobile ? (
    // Mobile View
    <div className={styles.mainLayout}>
      {slider.name === SliderState.START ? (
        <StartingSliderMobile name={name} setName={setName} />
      ) : slider.name === SliderState.MAIN || slider.name === SliderState.FINISHED ? (
        <TourProviderCustom name={name} setName={setName} />
      ) : (
        ""
      )}
    </div>
  ) : (
    // Desktop View
    <div className={styles.mainLayout}>
      {slider.name === SliderState.START ? (
        <StartingSlider name={name} setName={setName} />
      ) : slider.name === SliderState.MAIN ? (
        <MainSlider name={name} setName={setName} />
      ) : (
        ""
      )}
    </div>
  );
}
