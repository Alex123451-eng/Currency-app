import { useState } from "react";
import fx from "money";
import { Input, Button } from "antd";

import { SelectDropDown } from "../../components/selectDropDown/selectDropDown";

import { useRatesData } from "../../feautures/useRatesData";

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
    const { label, name } = e;
    const { fromInput, toInput } = inputValues;
    let { from, to } = selectValues;

    setSelectValues({
      ...selectValues,
      [name as string]: label,
    });

    if (fromInput === "" || toInput === "") return;

    if (name === "from") from = label;
    else to = label;

    setInputValues({
      fromInput,
      toInput: `${+fx.convert(fromInput, { from, to }).toFixed(2)}`,
    });
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    let { from, to } = selectValues;
    let fromInput = value;
    let toInput = `${+fx.convert(value, { from, to }).toFixed(2)}`;

    if (value === "") {
      setInputValues({
        fromInput: "",
        toInput: "",
      });

      return;
    }

    if (!value.match(/^[0-9]*[.]?[0-9]{0,2}$/)) return;

    if (name === "toInput") {
      [from, to] = [to, from];
      [fromInput, toInput] = [toInput, fromInput];
    }

    setInputValues({ fromInput, toInput });
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
          maxLength={10}
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
          maxLength={10}
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
