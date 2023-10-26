// userSlice.js
import CallApi from "@/utils/CallApi";
import { questions } from "@/utils/QuestionJson";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { stat } from "fs";

interface PredictDataInterface {
  sex: number;
  country_where_applying_country: number;
  country_where_applying_status: number;
  previous_marriage_indicator: number;
  purpose_of_visit: number;
  funds: number;
  contact_relation_to_me: number;
  contact_relation_to_me2: number;
  education_field_of_study: number;
  occupation_title1: number;
  occupation_title2: number;
  occupation_title3: number;
  no_authorized_stay: number;
  refused_entry_or_deport: number;
  previous_apply: number;
  date_of_birth: number;
  country_where_applying_period: number;
  marriage_period: number;
  previous_marriage_period: number;
  passport_expiry_date_remaining: number;
  how_long_stay_period: number;
  education_period: number;
  occupation_period: number;
  occupation_period2: number;
  occupation_period3: number;
  applicant_marital_status: number;
  previous_country_of_residence_count: number;
  sibling_foreigner_count: number;
  child_mother_father_spouse_foreigner_count: number;
  child_accompany: number;
  parent_accompany: number;
  spouse_accompany: number;
  sibling_accompany: number;
  child_average_age: number;
  child_count: number;
  sibling_average_age: number;
  sibling_count: number;
  long_distance_child_sibling_count: number;
  foreign_living_child_sibling_count: number;
}

export interface PredictInterface {
  predictData: object;
  nextPredict: string;
  chance: number;
  countAnswer: number;
  questionIndex: number;
  chartData: any;
  xaiChartData: object;
  chartDataKeys: any;
  chartDataValues: any;
  statusDataValues: boolean;
  lastData: any;
  loading: boolean;
  error: any;
}

const initialState = {
  predictData: {},
  nextPredict: "",
  chance: 0,
  potential: 0,
  countAnswer: 1,
  questionIndex: 0,
  chartData: [],
  xaiChartData: {
    sample_one: "",
    sample_two: "",
    sample_three: "",
    sample_four: "",
    sample_five: "",
    sample_six: "",
  },
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
      console.log(payload)
      if (payload) {
        // console.log(payload)
        // console.log(state.nextPredict)
        // console.log(questions.findIndex((item) => item.question_value === state.nextPredict))
        state.questionIndex = questions.findIndex((item) => item.question_value === state.nextPredict)
        // console.log(state.questionIndex)
      } else {
        console.log("eh vared shodam")
        state.questionIndex = state.questionIndex + 1;
      }
    },
    addCountAnswer: (state) => {
      state.countAnswer = state.countAnswer + 1
    },
    setNextPredictData: (state, { payload }) => {
      console.log(payload);
      state.nextPredict = payload.nextVariable;
    },
    setChanceData: (state, { payload }) => {
      state.chance = Math.round(Number(payload.chance) * 100);
    },
    setChartData: (state, { payload }) => {
      console.log(payload.data);
      state.chartData = payload.data;
      state.xaiChartData.sample_one = payload.data;
      state.xaiChartData.sample_two = payload.data;
      state.xaiChartData.sample_three = payload.data;
      state.xaiChartData.sample_four = payload.data;
      state.xaiChartData.sample_five = payload.data;
      state.xaiChartData.sample_six = payload.data;
    },
    setGroupedXai: (state, { payload }) => {
      console.log(payload);
      state.chartDataKeys = Object.keys(payload.data.aggregated_shap_values);
      state.chartDataValues = Object.values(payload.data.aggregated_shap_values);
      state.statusDataValues = !state.statusDataValues;
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

export const { setNextPredictData, setGroupedXai, setChartData, setChanceData, addCountAnswer, addCounterQuestionIndex, setLoading, setError } =
  predictSlice.actions;

export default predictSlice.reducer;
