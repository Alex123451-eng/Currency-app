import { useAppDispatch, useAppSelector } from "../app/hooks";

import { setRatesData, selectRatesData } from "./ratesDataSlice";

import { IRates } from "../types/types";

export const useRatesData = () => {
  const dispatch = useAppDispatch();

  const ratesData = useAppSelector(selectRatesData);

  const saveRatesData = (ratesData: IRates) => {
    dispatch(setRatesData(ratesData));
  };

  return { saveRatesData, ratesData };
};
