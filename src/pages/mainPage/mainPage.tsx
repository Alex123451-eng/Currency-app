import { useState } from "react";
import fx from "money";
import { Button } from "antd";

import { SelectDropDown } from "../../components/selectDropDown/selectDropDown";

import { useRatesData } from "../../feautures/useRatesData";

import { getData } from "../../utils/getData";

import { ISelectEvent } from "../../types/types";

import "./mainPage.css";

export const MainPage = () => {
  const [base, setBase] = useState<string>("RUB");

  const { ratesData, saveRatesData } = useRatesData();

  const initData = async () => {
    const { rates, base } = await getData();

    fx.rates = rates;
    saveRatesData({ rates, base });
  };

  const handleSelect = (_: string, e: ISelectEvent) => {
    setBase(e.label);
  };

  const handleUpdateBtnClick = () => {
    initData();
  };

  return (
    <>
      <div className="main-page-wrapper">
        <div className="main-page-wrapper__currency-wrapper">
          <div className="main-page-wrapper__currency">
            <span className="main-page-wrapper__rub bold">RUB: </span>
            {fx.convert(1, { from: "RUB", to: base }).toFixed(2)}
          </div>
          <div className="main-page-wrapper__currency">
            <span className="main-page-wrapper__usd bold">USD: </span>
            {fx.convert(1, { from: "USD", to: base }).toFixed(2)}
          </div>
          <div className="main-page-wrapper__currency">
            <span className="main-page-wrapper__usd bold">EUR: </span>
            {fx.convert(1, { from: "EUR", to: base }).toFixed(2)}
          </div>
        </div>

        <div className="main-page-wrapper__base-select">
          <div className="main-page-wrapper__currency-string">
            Select <span className="bold">base</span> currency
          </div>
          <SelectDropDown rates={ratesData.rates} handleSelect={handleSelect} />
          <Button
            type="primary"
            className="main-page-wrapper__update-button"
            onClick={handleUpdateBtnClick}
          >
            Update rates
          </Button>
        </div>
      </div>
    </>
  );
};
