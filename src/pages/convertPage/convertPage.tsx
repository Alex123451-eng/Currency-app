import { useState } from "react";
import fx from "money";
import { Input, Button } from "antd";

import { useRatesData } from "../../feautures/useRatesData";

import { SelectDropDown } from "../../components";

import { IInputValues, ISelectEvent } from "../../types/types";

import "./convertPage.css";

export const ConvertPage = () => {
  const [selectValues, setSelectValues] = useState({
    from: "RUB",
    to: "RUB",
  });
  const [inputValues, setInputValues] = useState<IInputValues>({
    fromInput: "",
    toInput: "",
  });

  const { ratesData } = useRatesData();

  const handleSelect = (_: string, e: ISelectEvent) => {
    console.log("_, e ", _, e);
    const { label, name } = e;
    const { fromInput, toInput } = inputValues;

    setSelectValues({
      ...selectValues,
      [name as string]: label,
    });

    if (fromInput === "" || toInput === "") return;

    if (name === "from") {
      setInputValues({
        fromInput,
        toInput: `${+fx
          .convert(fromInput, {
            from: label,
            to: selectValues.to,
          })
          .toFixed(2)}`,
      });
    }

    if (name === "to") {
      setInputValues({
        fromInput: `${+fx
          .convert(toInput, {
            from: selectValues.from,
            to: label,
          })
          .toFixed(2)}`,
        toInput,
      });
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    const { from, to } = selectValues;

    if (value === "") {
      setInputValues({
        fromInput: "",
        toInput: "",
      });

      return;
    }

    if (name === "fromInput") {
      setInputValues({
        fromInput: value,
        toInput: `${+fx
          .convert(value, {
            from,
            to,
          })
          .toFixed(2)}`,
      });
    }

    if (name === "toInput") {
      setInputValues({
        fromInput: `${+fx
          .convert(value, {
            from: to,
            to: from,
          })
          .toFixed(2)}`,
        toInput: value,
      });
    }
  };

  const handleBtnClick = () => {
    let { fromInput, toInput } = inputValues;
    let { from, to } = selectValues;

    [fromInput, toInput] = [toInput, fromInput];
    [from, to] = [to, from];

    setInputValues({
      fromInput,
      toInput,
    });

    setSelectValues({ from, to });
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
            value={selectValues.from}
          />
        </div>
        <Input
          name="fromInput"
          value={inputValues.fromInput}
          onChange={handleInput}
          placeholder="convert from"
          maxLength={5}
          className="convert-page-wrapper__from-input"
        />
      </div>
      <div className="convert-page-wrapper__to">
        <div className="convert-page-wrapper__choose-block">
          <span className="convert-page-wrapper__string bold">To</span>
          <SelectDropDown
            name="to"
            rates={ratesData.rates}
            handleSelect={handleSelect}
            value={selectValues.to}
          />
        </div>
        <Input
          name="toInput"
          value={inputValues.toInput}
          onChange={handleInput}
          placeholder="convert to"
          maxLength={5}
          className="convert-page-wrapper__to-input"
        />
      </div>
      <Button
        type="primary"
        className="convert-page-wrapper__change-btn"
        onClick={handleBtnClick}
      >
        Change currencies
      </Button>
    </div>
  );
};
