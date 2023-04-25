import { Select } from "antd";

import { ISelectDropDown } from "./types/types";

export const SelectDropDown: React.FC<ISelectDropDown> = ({
  name,
  rates,
  handleSelect,
  value,
}) => {
  return (
    <Select
      placeholder="RUB"
      options={Object.entries(rates).map(([currency, value]) => {
        return {
          label: currency,
          value,
          name,
        };
      })}
      onSelect={handleSelect}
      value={value}
    />
  );
};
