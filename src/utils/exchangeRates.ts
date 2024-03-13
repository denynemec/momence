import {
  ExchangeRate,
  ExchangeRates,
  ExchangeRatesWithDate,
  Options,
  emptyExchangeRatesWithDate,
} from '../types';

const parseValueWithDefault = ({
  key,
  value,
}: {
  key: string;
  value: string;
}) => {
  if (key in ['amount', 'rate']) {
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

  const [date, legend, ...lines] = exchangeRatesString.split('\n');

  const dateString = date.split('#')[0];

  const keys = legend.split('|').map((key) => key.toLocaleLowerCase());

  const exchangeRates = new Map();

  lines.forEach((line: string) => {
    const values = line.split('|');

    if (values.length !== 5) {
      return;
    }

    const entries = keys.map((key, index) => [
      key,
      parseValueWithDefault({ key, value: values[index] }),
    ]);

    const exchangeRate = Object.fromEntries(entries);

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

// TODO tests
