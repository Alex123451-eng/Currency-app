import { createSlice } from "@reduxjs/toolkit";

import { RootState } from "../app/store";
import { IRates } from "../types/types";

const initialState: IRates = {
  rates: {},
};

/* 
  IRates ->

  {
    rates: {
      RUB: '11',
      USD: '123',
    },
  }

  ICurrency ->

  {
    RUB: '11',
    USD: '123',
  }
*/

const ratesDataSlice = createSlice({
  name: "ratesData",
  initialState,
  reducers: {
    setRatesData(state, action) {
      console.log("action.payload ", action.payload);
      state.rates = action.payload;
    },
  },
});

export const { setRatesData } = ratesDataSlice.actions;

export const selectRatesData = (state: RootState) => state.ratesData;

export default ratesDataSlice.reducer;
