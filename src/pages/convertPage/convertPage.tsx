import { useState } from "react";
import fx from "money";
import { Input, Button } from "antd";

import { useRatesData } from "../../feautures/useRatesData";

import { SelectDropDown } from "../../components";

import "./convertPage.css";

export const ConvertPage = () => {
  const [selectValues, setSelectValues] = useState({
    from: "RUB",
    to: "RUB",
  });
  const [inputValues, setInputValues] = useState<any>({
    from: "",
    to: "",
  });

  const { ratesData } = useRatesData();

  const handleSelect = (_: any, e: any) => {
    const { label, name } = e;

    setSelectValues({
      ...selectValues,
      [name]: label,
    });
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    const { from, to } = selectValues;

    if (name === "from") {
      setInputValues({
        from: value,
        to: fx
          .convert(value, {
            from,
            to,
          })
          .toFixed(2),
      });
    }

    if (name === "to") {
      setInputValues({
        from: fx
          .convert(value, {
            from: to,
            to: from,
          })
          .toFixed(2),
        to: value,
      });
    }
  };

  return (
    <div className="convert-page-wrapper">
      <div className="convert-page-wrapper__from">
        <div className="convert-page-wrapper__choose-block">
          <span className="convert-page-wrapper__string bold">From</span>
          <SelectDropDown
            name="from"
            rates={ratesData.rates}
            handleSelect={handleSelect}
          />
        </div>
        <Input
          name="from"
          value={inputValues.from}
          onChange={handleInput}
          placeholder="convert from"
          maxLength={5}
          className="convert-page-wrapper__from-input"
        />
      </div>
      <div className="convert-page-wrapper__to">
        <div className="convert-page-wrapper__choose-block">
          <span className="convert-page-wrapper__string bold">to</span>
          <SelectDropDown
            name="to"
            rates={ratesData.rates}
            handleSelect={handleSelect}
          />
        </div>
        <Input
          name="to"
          value={inputValues.to}
          onChange={handleInput}
          placeholder="convert to"
          maxLength={5}
          className="convert-page-wrapper__to-input"
        />
      </div>
    </div>
  );
};
