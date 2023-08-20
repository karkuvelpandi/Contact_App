import { all } from "redux-saga/effects";
import { contactsSagas } from "../../components/Contacts/contacts.saga";
import { analyticsSaga } from "../../components/Dashboard/analytics.saga";
//
export default function* rootSaga() {
  yield all([...contactsSagas, ...analyticsSaga]);
}
