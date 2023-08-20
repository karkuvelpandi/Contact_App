import { PayloadAction, createAction, createSlice } from "@reduxjs/toolkit";
import { Actions } from "./analytics.saga";
import { ActionState, AsyncState } from "../../types";

// Actions for getting covid data
export const getWorldCovidData = createAction(
  Actions.getWorldCovidData + ActionState.REQUEST
);
export const getCountryWiseData = createAction(
  Actions.getCountryWiseData + ActionState.REQUEST
);
export const getCovidGraphData = createAction(
  Actions.getCovidGraphData + ActionState.REQUEST
);
//
interface AnalyticsState {
  worldCovidData: any;
  worldCovidDataStatus: string;
  worldCovidDataError: string;
  //
  countryWiseData: any;
  countryWiseDataStatus: string;
  countryWiseDataError: string;
  //
  covidGraphData: any;
  covidGraphDataStatus: string;
  covidGraphDataError: string;
}

const initialState: AnalyticsState = {
  worldCovidData: {},
  worldCovidDataStatus: AsyncState.IDLE,
  worldCovidDataError: "",
  //
  countryWiseData: [],
  countryWiseDataStatus: AsyncState.IDLE,
  countryWiseDataError: "",
  //
  covidGraphData: {},
  covidGraphDataStatus: "",
  covidGraphDataError: "",
};

const analyticsSlice = createSlice({
  name: "analytics",
  initialState,
  reducers: {},
  extraReducers(builder) {
    // Get world data
    builder.addCase(
      Actions.getWorldCovidData + ActionState.PENDING,
      (state) => {
        state.worldCovidDataStatus = AsyncState.PENDING;
        state.worldCovidDataError = "";
      }
    );
    builder.addCase(
      Actions.getWorldCovidData + ActionState.FULFILLED,
      (state, action: PayloadAction<any[]>) => {
        state.worldCovidData = action.payload;
        state.worldCovidDataStatus = AsyncState.FULFILLED;
        state.worldCovidDataError = "";
      }
    );
    builder.addCase(
      Actions.getWorldCovidData + ActionState.REJECTED,
      (state, action: PayloadAction<any>) => {
        state.worldCovidDataStatus = AsyncState.REJECTED;
        state.worldCovidDataError = action.payload;
      }
    );
    // Get country wise data
    builder.addCase(
      Actions.getCountryWiseData + ActionState.PENDING,
      (state) => {
        state.countryWiseDataStatus = AsyncState.PENDING;
        state.countryWiseDataError = "";
      }
    );
    builder.addCase(
      Actions.getCountryWiseData + ActionState.FULFILLED,
      (state, action: PayloadAction<any[]>) => {
        state.countryWiseData = action.payload;
        state.countryWiseDataStatus = AsyncState.FULFILLED;
        state.countryWiseDataError = "";
      }
    );
    builder.addCase(
      Actions.getCountryWiseData + ActionState.REJECTED,
      (state, action: PayloadAction<any>) => {
        state.countryWiseDataStatus = AsyncState.REJECTED;
        state.countryWiseDataError = action.payload;
      }
    );
    // Get graph data
    builder.addCase(
      Actions.getCovidGraphData + ActionState.PENDING,
      (state) => {
        state.covidGraphDataStatus = AsyncState.PENDING;
        state.covidGraphDataError = "";
      }
    );
    builder.addCase(
      Actions.getCovidGraphData + ActionState.FULFILLED,
      (state, action: PayloadAction<any[]>) => {
        state.covidGraphData = action.payload;
        state.covidGraphDataStatus = AsyncState.FULFILLED;
        state.covidGraphDataError = "";
      }
    );
    builder.addCase(
      Actions.getCovidGraphData + ActionState.REJECTED,
      (state, action: PayloadAction<any>) => {
        state.covidGraphDataStatus = AsyncState.REJECTED;
        state.covidGraphDataError = action.payload;
      }
    );
  },
});

export default analyticsSlice.reducer;
