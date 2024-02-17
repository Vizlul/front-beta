"use client";

import { configureStore } from "@reduxjs/toolkit";
import predictSlice from "./features/predictSlice";
import sliderSlice from "./features/sliderSlice";
import responseExplainSlice from "./features/responseExplainSlice"

const store = configureStore({
  reducer: {
    predict: predictSlice,
    slider: sliderSlice,
    responseExplain: responseExplainSlice,
  },
});

export default store;
