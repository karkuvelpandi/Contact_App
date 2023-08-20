import { createAction, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ActionState, AsyncState } from "../../types";
import { Actions } from "./contacts.saga";
import {
  Contact,
  AddContactData,
  UpdateContactData,
} from "../../types/contact";

/**
 * Action for getting all the lists on page reload.
 */
export const getAllContacts = createAction(
  Actions.getAllContacts + ActionState.REQUEST
);
export const getContact = createAction<number>(
  Actions.getContact + ActionState.REQUEST
);

export const deleteContact = createAction<number>(
  Actions.removeContact + ActionState.REQUEST
);
export const addContact = createAction<Contact>(
  Actions.addContact + ActionState.REQUEST
);
export const updateContact = createAction<UpdateContactData>(
  Actions.updateContact + ActionState.REQUEST
);

interface ContactState {
  availableContacts: Contact[];
  getAllContactsStatus: string;
  getAllContactsError: string;
  currentContact: Contact;
  getContactStatus: string;
  getContactError: string;
  addContactStatus: string;
  addContactError: string;
  deleteContactStatus: string;
  deleteContactError: string;
  updateContactStatus: string;
  updateContactError: string;
  updateContactId: number;
}

const initialState: ContactState = {
  availableContacts: [],
  getAllContactsStatus: AsyncState.IDLE,
  getAllContactsError: "",
  currentContact: {
    id: 0,
    firstName: "",
    lastName: "",
    email: "",
    image: "",
    status: "",
  },
  getContactStatus: AsyncState.IDLE,
  getContactError: "",
  addContactStatus: AsyncState.IDLE,
  addContactError: "",
  deleteContactStatus: AsyncState.IDLE,
  deleteContactError: "",
  updateContactStatus: AsyncState.IDLE,
  updateContactError: "",
  updateContactId: 0,
};

const contactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {
    updateContactId: (state, action: PayloadAction<number>) => {
      state.updateContactId = action.payload;
    },
  },
  extraReducers(builder) {
    // Get All contact
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
        state.getAllContactsStatus = AsyncState.REJECTED;
        state.getAllContactsError = action.payload;
      }
    );
    // Get Single contact
    builder.addCase(Actions.getContact + ActionState.PENDING, (state) => {
      state.getContactStatus = AsyncState.PENDING;
      state.getContactError = "";
    });
    builder.addCase(
      Actions.getContact + ActionState.FULFILLED,
      (state, action: PayloadAction<Contact>) => {
        state.currentContact = action.payload;
        state.getContactStatus = AsyncState.FULFILLED;
        state.getContactError = "";
      }
    );
    builder.addCase(
      Actions.getContact + ActionState.REJECTED,
      (state, action: PayloadAction<any>) => {
        state.getContactStatus = AsyncState.REJECTED;
        state.getContactError = action.payload;
      }
    );
    // Add new contact
    builder.addCase(Actions.addContact + ActionState.PENDING, (state) => {
      state.addContactStatus = AsyncState.PENDING;
      state.addContactError = "";
    });
    builder.addCase(
      Actions.addContact + ActionState.FULFILLED,
      (state, action: PayloadAction<AddContactData>) => {
        state.availableContacts = [
          ...state.availableContacts,
          action.payload.postData,
        ];
        state.currentContact = action.payload.postData;
        state.addContactStatus = AsyncState.FULFILLED;
        state.addContactError = "";
      }
    );
    builder.addCase(
      Actions.addContact + ActionState.REJECTED,
      (state, action: PayloadAction<any>) => {
        state.addContactStatus = AsyncState.REJECTED;
        state.addContactError = action.payload;
      }
    );
    // Update contact
    builder.addCase(Actions.updateContact + ActionState.PENDING, (state) => {
      state.updateContactStatus = AsyncState.PENDING;
      state.updateContactError = "";
    });
    builder.addCase(
      Actions.updateContact + ActionState.FULFILLED,
      (state, action: PayloadAction<Contact>) => {
        state.availableContacts = state.availableContacts.map((contact) =>
          contact.id === action.payload.id ? action.payload : contact
        );
        state.updateContactStatus = AsyncState.FULFILLED;
        state.updateContactError = "";
      }
    );
    builder.addCase(
      Actions.updateContact + ActionState.REJECTED,
      (state, action: PayloadAction<any>) => {
        state.updateContactStatus = AsyncState.REJECTED;
        state.updateContactError = action.payload;
      }
    );
    // Delete contact
    builder.addCase(Actions.removeContact + ActionState.PENDING, (state) => {
      state.deleteContactStatus = AsyncState.PENDING;
      state.deleteContactError = "";
    });
    builder.addCase(
      Actions.removeContact + ActionState.FULFILLED,
      (state, action: PayloadAction<number>) => {
        state.availableContacts = state.availableContacts.filter(
          (contact) => contact.id !== action.payload
        );
        state.deleteContactStatus = AsyncState.FULFILLED;
        state.deleteContactError = "";
      }
    );
    builder.addCase(
      Actions.removeContact + ActionState.REJECTED,
      (state, action: PayloadAction<any>) => {
        state.deleteContactStatus = AsyncState.REJECTED;
        state.deleteContactError = action.payload;
      }
    );
  },
});
export const { updateContactId } = contactSlice.actions;
export default contactSlice.reducer;
