export type ExchangeRate = {
  country: string;
  currency: string;
  amount: number;
  code: string;
  rate: number;
};

export type ExchangeRates = Map<string, ExchangeRate>;

export type ExchangeRatesWithDate = {
  date: Date;
  exchangeRates: ExchangeRates;
};

export const emptyExchangeRatesWithDate = (): ExchangeRatesWithDate => ({
  date: new Date(),
  exchangeRates: new Map(),
});

export const withDefaultValues = (
  exchangeRatesWithDate?: ExchangeRatesWithDate,
): ExchangeRatesWithDate => {
  if (typeof exchangeRatesWithDate === 'undefined') {
    return emptyExchangeRatesWithDate();
  }

  return exchangeRatesWithDate;
};
