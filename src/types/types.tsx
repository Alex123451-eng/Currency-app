export interface ICurrency {
  [currency: string]: string;
}

export interface IRates {
  base: string;
  rates: ICurrency;
}

export interface ISelectEvent {
  label: string;
  value: string;
  name?: string;
}

export interface IInputValues {
  fromInput: string;
  toInput: string;
}

export interface ISelectDropDown {
  name?: string;
  rates: ICurrency;
  handleSelect: (_: string, e: ISelectEvent) => void;
  value?: string;
}
