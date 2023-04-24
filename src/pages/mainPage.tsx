import React, { useState, useEffect } from "react";
import fx from "money";
import { Select, Button } from "antd";

import "./mainPage.css";

export const MainPage = () => {
  const [rates, setRates] = useState({});
  const [base, setBase] = useState();

  const getData = async () => {
    const response = await fetch("https://www.cbr-xml-daily.ru/latest.js");
    const data = await response.json();
    const result = await data;

    fx.rates = result.rates;
    fx.base = result.base;

    setRates(result.rates);
    setBase(result.base);
  };

  const handleSelect = (_: any, e: any) => {
    const { label } = e;

    setBase(label);
  };

  const handleUpdateBtnClick = () => {
    getData();
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div className="wrapper">
        {base && rates && (
          <div className="currency-wrapper">
            <div className="currency">
              <span className="bold rub">RUB:</span>{" "}
              {fx.convert(1, { from: "RUB", to: base }).toFixed(2)}
            </div>
            <div className="currency">
              <span className="bold usd">USD:</span>{" "}
              {fx.convert(1, { from: "USD", to: base }).toFixed(2)}
            </div>
            <div className="currency">
              <span className="bold eur">EUR:</span>{" "}
              {fx.convert(1, { from: "EUR", to: base }).toFixed(2)}
            </div>
          </div>
        )}

        <div className="base-select-wrapper">
          <div className="base-currency-string">
            Select <span className="bold">base</span> currency
          </div>
          <Select
            placeholder="RUB"
            options={Object.entries(rates).map(([currency, value]) => {
              return {
                label: currency,
                value,
              };
            })}
            onSelect={handleSelect}
          />
          <Button
            type="primary"
            className="update-button"
            onClick={handleUpdateBtnClick}
          >
            Update rates
          </Button>
        </div>
      </div>
    </>
  );
};
