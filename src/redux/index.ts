import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./sagas";
import appSlice from "./app.slice";
import visibilitySlice from "./visibility.slice";
//
const sagaMiddleware = createSagaMiddleware();
//
const middleware = [sagaMiddleware];
//
const store = configureStore({
  reducer: {
    app: appSlice,
    visibility: visibilitySlice,
    // contacts:contactsSlice
  },
  middleware,
});

// Setting up the store type
export type RootState = ReturnType<typeof store.getState>;

// Listening to the saga
sagaMiddleware.run(rootSaga);
//
export default store;
