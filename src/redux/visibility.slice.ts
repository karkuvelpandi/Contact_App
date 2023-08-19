import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface VisibilityState {
  isMobileView: boolean;
}

const initialState: VisibilityState = {
  isMobileView: false,
};

const visibilitySlice = createSlice({
  name: "visibility",
  initialState,
  reducers: {
    switchMobileView: (state, action: PayloadAction<boolean>) => {
      state.isMobileView = action.payload;
    },
  },
  extraReducers: {},
});

export const { switchMobileView } = visibilitySlice.actions;
export default visibilitySlice.reducer;
