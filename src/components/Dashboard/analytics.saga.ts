import { put, call, takeLatest } from "redux-saga/effects";
import { ActionState } from "../../types";
import { PayloadAction } from "@reduxjs/toolkit";
import * as API from "../../api/analytics.service";
import { Contact, UpdateContactData } from "../../types/contact";
export const Actions = {
  getWorldCovidData: "analytics/get-world-covid-data ",
  getCountryWiseData: "analytics/get-country-wise-data ",
  getCovidGraphData: "analytics/get-covid-graph-data",
};

// Get World covid data
function* getWorldCovidDataSaga() {
  yield takeLatest(
    Actions.getWorldCovidData + ActionState.REQUEST,
    function* (): any {
      try {
        yield put({
          type: Actions.getWorldCovidData + ActionState.PENDING,
        });
        const data = yield call(() => API.fetchCovidData());
        if (!data) throw new Error();
        console.log("data");
        yield put({
          type: Actions.getWorldCovidData + ActionState.FULFILLED,
          payload: data,
        });
      } catch (error: any) {
        yield put({
          type: Actions.getWorldCovidData + ActionState.REJECTED,
          payload: error?.message || "Something wrong happened!",
        });
      }
    }
  );
}
// Get country wise covid data
function* getCountryWiseDataSaga() {
  yield takeLatest(
    Actions.getCountryWiseData + ActionState.REQUEST,
    function* (): any {
      try {
        yield put({
          type: Actions.getCountryWiseData + ActionState.PENDING,
        });
        const data = yield call(() => API.fetchCountryWiseData());
        if (!data) throw new Error();
        console.log("data");
        yield put({
          type: Actions.getCountryWiseData + ActionState.FULFILLED,
          payload: data,
        });
      } catch (error: any) {
        yield put({
          type: Actions.getCountryWiseData + ActionState.REJECTED,
          payload: error?.message || "Something wrong happened!",
        });
      }
    }
  );
}
// Get covid graph data
function* getCovidGraphDataSaga() {
  yield takeLatest(
    Actions.getCovidGraphData + ActionState.REQUEST,
    function* (): any {
      try {
        yield put({
          type: Actions.getCovidGraphData + ActionState.PENDING,
        });
        const data = yield call(() => API.fetchCovidGraphData());
        if (!data) throw new Error();
        console.log("data");
        yield put({
          type: Actions.getCovidGraphData + ActionState.FULFILLED,
          payload: data,
        });
      } catch (error: any) {
        yield put({
          type: Actions.getCovidGraphData + ActionState.REJECTED,
          payload: error?.message || "Something wrong happened!",
        });
      }
    }
  );
}
export const analyticsSaga = [
  getWorldCovidDataSaga(),
  getCountryWiseDataSaga(),
  getCovidGraphDataSaga(),
];
