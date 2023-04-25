import React, { useState, useEffect } from "react";
import fx from "money";
import { Button } from "antd";

import { useRatesData } from "../../feautures/useRatesData";

import { SelectDropDown } from "../../components";

import { ISelectEvent } from "../../types/types";

import "./mainPage.css";

export const MainPage = () => {
  const [base, setBase] = useState<string>();
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  const { saveRatesData, ratesData } = useRatesData();

  const getData = async () => {
    const response = await fetch("https://www.cbr-xml-daily.ru/latest.js");
    const data = await response.json();
    const result = await data;

    result.rates = {
      ...result.rates,
      [result.base]: 1,
    };

    fx.rates = result.rates;
    fx.base = result.base;

    console.log("results.rates ", result.rates);

    saveRatesData(result.rates);
    setBase(result.base);
    setIsDataLoaded(true);
  };

  const handleSelect = (_: string, e: ISelectEvent) => {
    setBase(e.label);
  };

  const handleUpdateBtnClick = () => {
    getData();
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      {isDataLoaded && (
        <div className="main-page-wrapper">
          <div className="main-page-wrapper__currency-wrapper">
            <div className="main-page-wrapper__currency">
              <span className="main-page-wrapper__rub bold">RUB:</span>{" "}
              {fx.convert(1, { from: "RUB", to: base }).toFixed(2)}
            </div>
            <div className="main-page-wrapper__currency">
              <span className="main-page-wrapper__usd bold">USD:</span>{" "}
              {fx.convert(1, { from: "USD", to: base }).toFixed(2)}
            </div>
            <div className="main-page-wrapper__currency">
              <span className="main-page-wrapper__usd bold">EUR:</span>{" "}
              {fx.convert(1, { from: "EUR", to: base }).toFixed(2)}
            </div>
          </div>

          <div className="main-page-wrapper__base-select">
            <div className="main-page-wrapper__currency-string">
              Select <span className="bold">base</span> currency
            </div>
            <SelectDropDown
              rates={ratesData.rates}
              handleSelect={handleSelect}
            />
            <Button
              type="primary"
              className="main-page-wrapper__update-button"
              onClick={handleUpdateBtnClick}
            >
              Update rates
            </Button>
          </div>
        </div>
      )}
    </>
  );
};
