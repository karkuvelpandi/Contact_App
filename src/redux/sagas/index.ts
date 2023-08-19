import { all } from "redux-saga/effects";
import { contactsSagas } from "../../components/Contacts/contacts.saga";
export default function* rootSaga() {
  yield all([...contactsSagas]);
}
