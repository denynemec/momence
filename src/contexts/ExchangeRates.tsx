import React, { createContext, useContext } from 'react';

import { ExchangeRatesWithDate, emptyExchangeRatesWithDate } from '../types';

const ExchangeRatesContext = createContext<ExchangeRatesWithDate>(
  emptyExchangeRatesWithDate(),
);

export const useExchangeRates = () => {
  const context = useContext(ExchangeRatesContext);

  if (!context) {
    throw new Error('ExchangeRates context provider not found!');
  }

  return context;
};

type Props = { children: React.ReactNode; data: ExchangeRatesWithDate };

export const ExchangeRatesContextProvider = ({ children, data }: Props) => {
  return (
    <ExchangeRatesContext.Provider value={data}>
      {children}
    </ExchangeRatesContext.Provider>
  );
};
