import { createAction, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ActionState, AsyncState } from "../../types";
import { Actions } from "./contacts.saga";
import { Contact } from "../../types/contact";

/**
 * Action for getting all the lists on page reload.
 */
export const getAllContacts = createAction(
  Actions.getAllContacts + ActionState.REQUEST
);

interface ContactState {
  availableContacts: Contact[];
  getAllContactsStatus: string;
  getAllContactsError: string;
}

const initialState: ContactState = {
  availableContacts: [],
  getAllContactsStatus: AsyncState.IDLE,
  getAllContactsError: "",
};

const contactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(Actions.getAllContacts + ActionState.PENDING, (state) => {
      state.getAllContactsStatus = AsyncState.PENDING;
      state.getAllContactsError = "";
    });
    builder.addCase(
      Actions.getAllContacts + ActionState.FULFILLED,
      (state, action: PayloadAction<Contact[]>) => {
        state.availableContacts = action.payload;
        state.getAllContactsStatus = AsyncState.FULFILLED;
        state.getAllContactsError = "";
      }
    );
    builder.addCase(
      Actions.getAllContacts + ActionState.REJECTED,
      (state, action: PayloadAction<any>) => {
        state.getAllContactsStatus = AsyncState.FULFILLED;
        state.getAllContactsError = action.payload;
      }
    );
  },
});

export default contactSlice.reducer;
