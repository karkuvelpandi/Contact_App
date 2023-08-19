import { put, call, takeLatest } from "redux-saga/effects";
import { ActionState } from "../../types";
import { PayloadAction } from "@reduxjs/toolkit";
import * as API from "../../api/contacts.service";
export const Actions = {
  getAllContacts: "contact/get-all-contacts",
  getContact: "contact/get-contact",
  updateContact: "contact/update-contact",
  removeContact: "contact/remove-contact",
};

function* getAllContactsSaga() {
  yield takeLatest(
    Actions.getAllContacts + ActionState.REQUEST,
    function* (): any {
      try {
        yield put({
          type: Actions.getAllContacts + ActionState.PENDING,
        });
        const data = yield call(() => API.getAllContacts());
        if (!data) throw new Error();

        yield put({
          type: Actions.getAllContacts + ActionState.FULFILLED,
          payload: data,
        });
      } catch (e: any) {
        yield put({
          type: Actions.getAllContacts + ActionState.REJECTED,
          payload: e?.message || "Something wrong happened!",
        });
      }
    }
  );
}

export const contactsSagas = [getAllContactsSaga()];
