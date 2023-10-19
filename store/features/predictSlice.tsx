// userSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  predictData: {
    name: "test"
  },
  loading: true,
  error: null,
};

const userSlice = createSlice({
  name: "predict",
  initialState,
  reducers: {
    setPredictData: (state, action) => {
      state.predictData = action.payload;
      state.loading = false;
      state.error = null;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { setPredictData, setLoading, setError } = userSlice.actions;

export default userSlice.reducer;
