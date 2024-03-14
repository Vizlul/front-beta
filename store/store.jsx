"use client";

import { configureStore } from "@reduxjs/toolkit";
import predictSlice from "./features/predictSlice";
import sliderSlice from "./features/sliderSlice";
import responseExplainSlice from "./features/responseExplainSlice";
import chartsSlice from "./features/chartsSlice";

const store = configureStore({
  reducer: {
    predict: predictSlice,
    slider: sliderSlice,
    responseExplain: responseExplainSlice,
    charts: chartsSlice,
  },
});

export default store;
