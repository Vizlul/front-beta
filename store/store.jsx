"use client";

import { configureStore } from "@reduxjs/toolkit";
import predictSlice from "./features/predictSlice";
import sliderSlice from "./features/sliderSlice";

const store = configureStore({
  reducer: {
    predict: predictSlice,
    slider: sliderSlice
  },
});


export default store;