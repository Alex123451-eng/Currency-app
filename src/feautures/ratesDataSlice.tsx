import { createSlice } from "@reduxjs/toolkit";

import { RootState } from "../app/store";
import { IRates } from "../types/types";

const initialState: IRates = {
  rates: {},
};

const ratesDataSlice = createSlice({
  name: "ratesData",
  initialState,
  reducers: {
    setRatesData(state, action) {
      state.rates = action.payload;
    },
  },
});

export const { setRatesData } = ratesDataSlice.actions;

export const selectRatesData = (state: RootState) => state.ratesData;

export default ratesDataSlice.reducer;
