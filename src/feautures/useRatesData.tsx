import { useAppDispatch, useAppSelector } from "../app/hooks";

import { setRatesData, selectRatesData } from "./ratesDataSlice";

import { ICurrency } from "../types/types";

export const useRatesData = () => {
  const dispatch = useAppDispatch();

  const ratesData = useAppSelector(selectRatesData);

  const saveRatesData = (ratesData: ICurrency) => {
    dispatch(setRatesData(ratesData));
  };

  return { saveRatesData, ratesData };
};
