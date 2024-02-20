import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  purpose: "",
  carreer: "",
  financial: "",
  emotional: "",
};

const responseExplainSlice = createSlice({
  name: "response",
  initialState,
  reducers: {
    setResponse: (state, { payload }) => {
      state.purpose = payload["purpose"];
      state.carreer = payload["carreer"];
      state.financial = payload["financial"];
      state.emotional = payload["emotional"];
    },
  },
});

export const { setResponse } = responseExplainSlice.actions;

export default responseExplainSlice.reducer;
