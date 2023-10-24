// userSlice.js
import CallApi from "@/utils/CallApi";
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

interface PredictObjectInterface {
  predictData: object;
  chance: number;
  loading: boolean;
  error: any;
}

const initialState = {
  predictData: {
    sex: "FEMALE",
    country_where_applying_country: "TURKEY",
    country_where_applying_status: "OTHER",
    previous_marriage_indicator: false,
    purpose_of_visit: "tourism",
    funds: 8000,
    contact_relation_to_me: "hotel",
    contact_relation_to_me2: "ukn",
    education_field_of_study: "unedu",
    occupation_title1: "OTHER",
    occupation_title2: "OTHER",
    occupation_title3: "OTHER",
    no_authorized_stay: false,
    refused_entry_or_deport: false,
    previous_apply: false,
    date_of_birth: 20,
    country_where_applying_period: 30,
    marriage_period: 0,
    previous_marriage_period: 0,
    passport_expiry_date_remaining: 3,
    how_long_stay_period: 30,
    education_period: 0,
    occupation_period: 0,
    occupation_period2: 0,
    occupation_period3: 0,
    applicant_marital_status: "single",
    previous_country_of_residence_count: 0,
    sibling_foreigner_count: 0,
    child_mother_father_spouse_foreigner_count: 0,
    child_accompany: 0,
    parent_accompany: 0,
    spouse_accompany: 0,
    sibling_accompany: 0,
    child_average_age: 0,
    child_count: 0,
    sibling_average_age: 0,
    sibling_count: 0,
    long_distance_child_sibling_count: 0,
    foreign_living_child_sibling_count: 0,
  },
  chance: 0,
  loading: true,
  error: null,
};

// Create an async thunk action for making the API call
export const fetchPredictData = createAsyncThunk(
  "predict/fetchPredictData",
  async (requestData, { dispatch, getState }) => {
    try {
      const response = await CallApi.post("/predict", initialState.predictData);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

const predictSlice = createSlice({
  name: "predict",
  initialState,
  reducers: {
    setPredictData: (state) => {
      CallApi.post("/predict", state.predictData).then(async (resp) => {
        console.log(resp.data.result)
        state.chance = resp.data.result
      }).catch((error) => {
        console.log(error)
      });
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
  extraReducers: (builder) => {
    builder.addCase(fetchPredictData.fulfilled, (state, action) => {
      state.chance = action.payload.result
    })
  }
});

export const { setPredictData, setLoading, setError } = predictSlice.actions;

export default predictSlice.reducer;
