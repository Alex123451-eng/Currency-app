export const getData = async () => {
  const response = await fetch("https://www.cbr-xml-daily.ru/latest.js");
  const data = await response.json();
  const result = await data;

  result.rates = {
    ...result.rates,
    [result.base]: 1,
  };

  const { rates } = result;

  return { rates };
};
