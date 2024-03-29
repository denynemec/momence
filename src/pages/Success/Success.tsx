import React, { useMemo, useState } from 'react';

import { Button, Input, Select } from '../../components';
import { useExchangeRates } from '../../contexts';
import { Container } from '../../templates';
import { convert, format, toOptions } from '../../utils';

import * as Styles from './Success.styles';

export const Success = () => {
  const [value, setValue] = useState('');
  const [selectedCurrency, setSelectedCurrency] = useState<string>('');
  const [convertedValue, setConvertedValue] = useState<number | null>(null);
  const { date, exchangeRates } = useExchangeRates();

  const currencyOptions = useMemo(
    () => toOptions(exchangeRates),
    [exchangeRates],
  );

  const clearConvertedValue = () => {
    setConvertedValue(null);
  };

  const onValueChange = (newValue: string) => {
    setValue(newValue);
    clearConvertedValue();
  };

  const onCurrencyChange = (newCurrency: string) => {
    setSelectedCurrency(newCurrency);
    clearConvertedValue();
  };

  const onSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();

    const convertedValue = convert(
      Number(value),
      exchangeRates.get(selectedCurrency),
    );

    setConvertedValue(convertedValue);
  };

  const view = (content: React.ReactNode) => (
    <Container>
      <h2>Exchange rate app ({date.toLocaleDateString('en-US')})</h2>
      {content}
    </Container>
  );

  if (exchangeRates.size === 0) {
    return view(<p>No exchange rates available</p>);
  }

  const isSubmitDisabled = value === '' || isNaN(Number(value));

  const form = (
    <Styles.Form onSubmit={onSubmit}>
      <Input
        value={value}
        inputName="value"
        onChange={onValueChange}
        label="Value in CZK"
        minValue={0}
      />

      <Styles.FormElementWrapper>
        <Select
          label="Choose currency"
          inputName="currency"
          options={currencyOptions}
          onChange={onCurrencyChange}
          value={selectedCurrency}
        />
      </Styles.FormElementWrapper>

      <Styles.FormElementWrapper>
        <Button type="submit" label="Convert" disabled={isSubmitDisabled} />
      </Styles.FormElementWrapper>

      {convertedValue !== null && (
        <p>{`${format({ value })} is approx ${format({ value: convertedValue, currency: selectedCurrency })}`}</p>
      )}
    </Styles.Form>
  );

  return view(form);
};
