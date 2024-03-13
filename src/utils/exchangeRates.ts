import {
  ExchangeRate,
  ExchangeRates,
  ExchangeRatesWithDate,
  Options,
  emptyExchangeRatesWithDate,
} from '../types';

export const parseValueWithDefault = ({
  key,
  value,
}: {
  key: string;
  value: string;
}) => {
  if (['amount', 'rate'].includes(key)) {
    const parsedNumber = Number(value);

    if (isNaN(parsedNumber)) {
      return 1;
    }

    return parsedNumber;
  }

  return value;
};

export const parseExchangeRates = (
  exchangeRatesString?: string,
): ExchangeRatesWithDate => {
  if (!exchangeRatesString) {
    return emptyExchangeRatesWithDate();
  }

  const [dateLine, keysLine, ...lines] = exchangeRatesString.split('\n');

  const dateString = dateLine.split('#')[0];

  const keys = keysLine.split('|').map((key) => key.toLocaleLowerCase());

  const parseExchangeRateLine_ = parseExchangeRateLine(keys);

  const exchangeRates = lines.reduce((acc, current) => {
    const exchangeRate = parseExchangeRateLine_(current);

    if (exchangeRate === null) {
      return acc;
    }

    return acc.set(exchangeRate.code, exchangeRate);
  }, new Map<string, ExchangeRate>());

  return {
    date: new Date(dateString),
    exchangeRates,
  };
};

export const parseExchangeRateLine =
  (keys: string[]) =>
  (line: string): ExchangeRate | null => {
    const values = line.split('|');

    if (values.length !== 5) {
      return null;
    }

    const entries = keys.map((key, index) => [
      key,
      parseValueWithDefault({ key, value: values[index] }),
    ]);

    return Object.fromEntries(entries);
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

export const withDefaultValues = (
  exchangeRatesWithDate?: ExchangeRatesWithDate,
): ExchangeRatesWithDate => {
  if (typeof exchangeRatesWithDate === 'undefined') {
    return emptyExchangeRatesWithDate();
  }

  return exchangeRatesWithDate;
};
