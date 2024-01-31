// userSlice.js
import CallApi from "@/utils/CallApi";
import { questions } from "@/utils/QuestionJson";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  predictData: {},
  nextPredict: "",
  nextPredictBackup: "",
  chance: 0,
  potential: 0,
  countAnswer: 1,
  questionNumber: 1,
  questionIndex: 0,
  countSlider: 1,
  chartData: [],
  xaiChartData: {
    sample_one: "",
    sample_two: "",
    sample_three: "",
    sample_four: "",
    sample_five: "",
    sample_six: "",
  },
  groupedXaiExpanded: {},
  chartDataKeys: [],
  chartDataValues: [-1, -1, -1, -1],
  statusDataValues: false,
  lastData: [],
  loading: false,
  error: null,
};

const predictSlice = createSlice({
  name: "predict",
  initialState,
  reducers: {
    addCounterQuestionIndex: (state, { payload }) => {
      if (payload) {
        // console.log(payload)
        // console.log(state.nextPredict)
        // console.log(questions.findIndex((item) => item.question_value === state.nextPredict))
        state.questionIndex = questions.findIndex((item) => item.question_value === state.nextPredict);
        // console.log(state.questionIndex)
      } else {
        state.questionIndex = state.questionIndex + 1;
      }
    },
    setCountAnswer: (state) => {
      state.countAnswer = state.questionNumber;
    },
    addCountAnswer: (state) => {
      if (state.countAnswer > 1) {
        state.countSlider = state.countAnswer;
      }
      state.countAnswer = state.countAnswer + 1;
    },
    minusCountAnswer: (state) => {
      state.countAnswer = state.countAnswer - 1;
    },
    setCountQuestion: (state) => {
      state.questionNumber = state.countAnswer;
    },
    minusCountQuestion: (state) => {
      state.questionNumber = state.questionNumber - 1;
    },
    addCountQuestion: (state) => {
      state.questionNumber = state.questionNumber + 1;
    },
    setNextPredictData: (state, { payload }) => {
      state.nextPredict = payload.nextVariable;
    },
    setNextPredictBackup: (state, { payload }) => {
      state.nextPredictBackup = payload.nextVariable;
    },
    setChanceData: (state, { payload }) => {
      if (payload.chance !== Math.floor(payload.chance)) {
        console.log(payload.chance);
        state.chance = payload.chance === 1 ? 100 : Math.round(Number(payload.chance) * 100);
      } else {
        state.chance = payload.chance === 1 ? 100 : payload.chance;
      }
    },
    setPotentialData: (state, { payload }) => {
      if (payload !== Math.floor(payload)) {
        state.potential = Math.round(Number(payload) * 100);
      } else {
        state.potential = payload;
      }
    },
    setChartData: (state, { payload }) => {
      state.chartData = payload.data;
      state.xaiChartData.sample_one = payload.data;
      state.xaiChartData.sample_two = payload.data;
      state.xaiChartData.sample_three = payload.data;
      state.xaiChartData.sample_four = payload.data;
      state.xaiChartData.sample_five = payload.data;
      state.xaiChartData.sample_six = payload.data;
    },
    setGroupedXai: (state, { payload }) => {
      state.chartDataKeys = Object.keys(payload.data.aggregated_shap_values);
      state.chartDataValues = Object.values(payload.data.aggregated_shap_values).map((value) =>
        (value * 100).toFixed(2)
      );
      state.statusDataValues = !state.statusDataValues;
    },
    setGroupedXaiExpanded: (state, { payload }) => {
      state.groupedXaiExpanded = payload;
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

export const {
  setNextPredictData,
  setNextPredictBackup,
  setGroupedXai,
  setChartData,
  setChanceData,
  addCountAnswer,
  minusCountAnswer,
  setCountQuestion,
  setCountAnswer,
  minusCountQuestion,
  addCountQuestion,
  addCounterQuestionIndex,
  setGroupedXaiExpanded,
  setPotentialData,
  setLoading,
  setError,
} = predictSlice.actions;

export default predictSlice.reducer;
