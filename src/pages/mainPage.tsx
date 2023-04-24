import React, { useState, useEffect } from "react";

import { Select } from "antd";

export const MainPage = () => {
  const [currencies, setCurrencies] = useState([1, 2, 3]);

  const getData = async () => {
    const response = await fetch("https://www.cbr-xml-daily.ru/latest.js");
    const data = await response.json();
    const result = await data;
    console.log(result);
    console.log(result.Valute.AUD);
    console.log(result.Valute.AUD.Value);
    // setCurrencies(result);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Select
        placeholder="Base currency"
        options={currencies.map((currency) => {
          return {
            label: `$${currency}`,
            value: currency,
          };
        })}
      />
    </>
  );
};
