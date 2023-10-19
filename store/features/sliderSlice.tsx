
import { createSlice } from '@reduxjs/toolkit';
import { SliderState } from "@/constants"

const initialState = {
  name: SliderState.START, // Use the enum value
}

const sliderSlice = createSlice({
  name: "sliderSlice",
  initialState,
  reducers: {
    setToStart: (state) => {
      state.name = SliderState.START;
    },
    setToMain: (state) => {
      state.name = SliderState.MAIN;
    },
    setToFinished: (state) => {
      state.name = SliderState.FINISHED;
    },
  },
});

export const { setToStart, setToMain, setToFinished } = sliderSlice.actions;

export default sliderSlice.reducer;