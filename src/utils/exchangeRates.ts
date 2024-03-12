import {
  ExchangeRate,
  ExchangeRates,
  ExchangeRatesWithDate,
  Options,
  emptyExchangeRatesWithDate,
} from '../types';

export const parseExchangeRates = (
  exchangeRatesString?: string,
): ExchangeRatesWithDate => {
  if (!exchangeRatesString) {
    return emptyExchangeRatesWithDate();
  }

  const [first, , ...lines] = exchangeRatesString.split('\n');

  const dateString = first.split('#')[0];

  const exchangeRates = new Map();

  lines.forEach((line: string) => {
    // TODO dynamic format (take second line for it)
    const [country, currency, amount, code, rate] = line.split('|');

    const exchangeRate = {
      country,
      currency,
      amount: Number(amount), // TODO check if can be parsed
      code,
      rate: Number(rate), // TODO check if can be parsed
    };

    exchangeRates.set(getExchangeRateKey(exchangeRate), exchangeRate);
  });

  return {
    date: new Date(dateString),
    exchangeRates,
  };
};

const getExchangeRateKey = ({ country, currency, code }: ExchangeRate) => {
  return [country, currency, code].join('-');
};

export const toOptions = (exchangeRates: ExchangeRates): Options => {
  return [...exchangeRates].map(([key, { country, currency, code }]) => ({
    key,
    label: `Country: ${country}, currency: ${currency} (${code})`,
  }));
};

export const convert = (czkAmount: number, exchangeRate?: ExchangeRate) => {
  if (typeof exchangeRate === 'undefined') {
    return czkAmount;
  }

  const { amount, rate } = exchangeRate;

  return czkAmount / amount / rate;
};
