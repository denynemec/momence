import { expect, describe, test } from 'vitest';
import {
  parseExchangeRateLine,
  parseExchangeRates,
  parseValueWithDefault,
} from './exchangeRates';
import { ExchangeRatesWithDate, ExchangeRate } from '../types';

describe('parseValueWithDefault', () => {
  test('return pasted value', () => {
    const value = 'val';

    expect(parseValueWithDefault({ key: 'key', value })).toBe(value);
  });

  test('return parsed number', () => {
    const amountValue = '1.123';
    const amount = { key: 'amount', value: amountValue };
    const rateValue = '2';
    const rate = { key: 'rate', value: rateValue };

    expect(parseValueWithDefault(amount)).toBe(Number(amountValue));
    expect(parseValueWithDefault(rate)).toBe(Number(rateValue));
  });

  test('return default number', () => {
    const amountValue = 'amountValue';
    const amount = { key: 'amount', value: amountValue };
    const rateValue = 'rateValue';
    const rate = { key: 'rate', value: rateValue };

    expect(parseValueWithDefault(amount)).toBe(1);
    expect(parseValueWithDefault(rate)).toBe(1);
  });
});

describe('parseExchangeRateLine', () => {
  const exchangeRateKeys = ['country', 'currency', 'amount', 'code', 'rate'];

  const parsedExchangeRate: ExchangeRate = {
    country: 'Country',
    currency: 'Currency',
    amount: 2,
    code: 'CODE',
    rate: 11,
  };

  test('return parsed exchange rate', () => {
    expect(
      parseExchangeRateLine(exchangeRateKeys)('Country|Currency|2|CODE|11'),
    ).toStrictEqual(parsedExchangeRate);
  });

  test('return parsed exchange rate with default numbers', () => {
    expect(
      parseExchangeRateLine(exchangeRateKeys)('Country|Currency|Joe|CODE|John'),
    ).toStrictEqual({ ...parsedExchangeRate, amount: 1, rate: 1 });
  });

  test('return parsed exchange rate with different formats', () => {
    expect(
      parseExchangeRateLine(['currency', 'amount', 'code', 'rate', 'country'])(
        'Currency|2|CODE|11|Country',
      ),
    ).toStrictEqual(parsedExchangeRate);

    expect(
      parseExchangeRateLine(['currency', 'amount', 'rate', 'country', 'code'])(
        'Currency|2|11|Country|CODE',
      ),
    ).toStrictEqual(parsedExchangeRate);

    expect(
      parseExchangeRateLine(['amount', 'rate', 'currency', 'country', 'code'])(
        '2|11|Currency|Country|CODE',
      ),
    ).toStrictEqual(parsedExchangeRate);
  });

  test('line without all 5 values should not be parsed', () => {
    expect(
      parseExchangeRateLine(exchangeRateKeys)('Country|Currency|Joe|CODEJohn'),
    ).toBe(null);
  });
});

describe('parseExchangeRates', () => {
  const dateString = '12 Mar 2024';
  const exchangeRateString = `${dateString} #51\nCountry|Currency|Amount|Code|Rate\nAustralia|dollar|1|AUD|15.284\n`;
  const australiaExchangeRate: ExchangeRate = {
    country: 'Australia',
    currency: 'dollar',
    amount: 1,
    code: 'AUD',
    rate: 15.284,
  };

  const exchangeRatesMap = new Map();
  exchangeRatesMap.set(australiaExchangeRate.code, australiaExchangeRate);

  const exchangeRatesResult: ExchangeRatesWithDate = {
    date: new Date(dateString),
    exchangeRates: exchangeRatesMap,
  };

  test('Parse exchange rates', () => {
    expect(parseExchangeRates(exchangeRateString)).toStrictEqual(
      exchangeRatesResult,
    );
  });

  test('Should skip exchangeRate without all values', () => {
    expect(
      parseExchangeRates(`${exchangeRateString}Brazil|real|1|BRL\n`),
    ).toStrictEqual(exchangeRatesResult);
  });
});
