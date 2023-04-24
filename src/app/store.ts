import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import ratesDataReducer from "../feautures/ratesDataSlice"

export const store = configureStore({
  reducer: {
    ratesData: ratesDataReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
