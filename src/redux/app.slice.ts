import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// App initial state interface
interface AppState {
  isOffline: boolean;
  appHeaderText: string;
}

// App initial state
const initialState: AppState = {
  isOffline: false,
  appHeaderText: "",
};
//
const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setAppOffline: (state, action: PayloadAction<boolean>) => {
      state.isOffline = !!action.payload;
    },
    updateHeaderText: (state, action: PayloadAction<string>) => {
      state.appHeaderText = action.payload;
    },
  },
});
//
export const { setAppOffline, updateHeaderText } = appSlice.actions;
export default appSlice.reducer;
