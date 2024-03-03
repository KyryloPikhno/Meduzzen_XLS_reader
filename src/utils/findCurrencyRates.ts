interface ICurrencyRates {
  [key: string]: number;
}

export const findCurrencyRates = (rows: string[][]) => {
  const currencyRates: ICurrencyRates = {};

  rows
    .filter((row) => row.some((item) => item.toString().includes("Rate")))
    .forEach((row) => {
      const currencyName = row[0].replace(" Rate", "");
      const currencyRate = parseFloat(row[1]);
      currencyRates[currencyName] = currencyRate;
    });

  return currencyRates;
};
