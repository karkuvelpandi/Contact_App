import { put, call, takeLatest } from "redux-saga/effects";
import { ActionState } from "../../types";
import { PayloadAction } from "@reduxjs/toolkit";
import * as API from "../../api/contacts.service";
import { ContactPostData, UpdateContactData } from "../../types/contact";
export const Actions = {
  addContact: "contact/add-contact ",
  getAllContacts: "contact/get-all-contacts ",
  getContact: "contact/get-contact ",
  updateContact: "contact/update-contact ",
  removeContact: "contact/remove-contact ",
};
// Add new contact
function* addContactSaga() {
  yield takeLatest(
    Actions.addContact + ActionState.REQUEST,
    function* (action: PayloadAction<ContactPostData>): any {
      try {
        yield put({
          type: Actions.addContact + ActionState.PENDING,
        });
        const data = yield call(() => API.addContact(action.payload));
        if (!data) throw new Error();

        yield put({
          type: Actions.addContact + ActionState.FULFILLED,
          payload: {
            postData: action.payload,
            data,
          },
        });
      } catch (error: any) {
        yield put({
          type: Actions.addContact + ActionState.REJECTED,
          payload: error?.message || "Something wrong happened!",
        });
      }
    }
  );
}
// Get all contact
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
      } catch (error: any) {
        yield put({
          type: Actions.getAllContacts + ActionState.REJECTED,
          payload: error?.message || "Something wrong happened!",
        });
      }
    }
  );
}
// Get single contact
function* getContactSaga() {
  yield takeLatest(
    Actions.getContact + ActionState.REQUEST,
    function* (action: PayloadAction<string>): any {
      try {
        yield put({
          type: Actions.getContact + ActionState.PENDING,
        });
        const data = yield call(() => API.getContact(action.payload));
        if (!data) throw new Error();

        yield put({
          type: Actions.getContact + ActionState.FULFILLED,
          payload: data,
        });
      } catch (error: any) {
        yield put({
          type: Actions.getContact + ActionState.REJECTED,
          payload: error?.message || "Something wrong happened!",
        });
      }
    }
  );
}
// Delete contact
function* removeContactSaga() {
  yield takeLatest(
    Actions.removeContact + ActionState.REQUEST,
    function* (action: PayloadAction<string>): any {
      try {
        yield put({
          type: Actions.removeContact + ActionState.PENDING,
        });
        const data = yield call(() => API.deleteContact(action.payload));
        if (!data) throw new Error();

        yield put({
          type: Actions.removeContact + ActionState.FULFILLED,
          payload: action.payload,
        });
      } catch (error: any) {
        yield put({
          type: Actions.removeContact + ActionState.REJECTED,
          payload: error?.message || "Something wrong happened!",
        });
      }
    }
  );
}
// Update COntact
function* updateContactSaga() {
  yield takeLatest(
    Actions.updateContact + ActionState.REQUEST,
    function* (action: PayloadAction<UpdateContactData>): any {
      try {
        yield put({
          type: Actions.updateContact + ActionState.PENDING,
        });
        const data = yield call(() =>
          API.updateContact(action.payload._id, action.payload.data)
        );
        if (!data) throw new Error();

        yield put({
          type: Actions.updateContact + ActionState.FULFILLED,
          payload: data.contact,
        });
      } catch (error: any) {
        yield put({
          type: Actions.updateContact + ActionState.REJECTED,
          payload: error?.message || "Something wrong happened!",
        });
      }
    }
  );
}
//
export const contactsSagas = [
  getAllContactsSaga(),
  getContactSaga(),
  removeContactSaga(),
  updateContactSaga(),
  addContactSaga(),
];
