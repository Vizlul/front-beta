import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
};

const chartsSlice = createSlice({
  name: "chartsSlice",
  initialState,
  reducers: {
    setChartName: (state, { payload }) => {
      console.log(payload)
      state.name = payload;
    },
  },
});

export const { setChartName } = chartsSlice.actions;

export default chartsSlice.reducer;
