import { useQuery } from '@tanstack/react-query';

import { ExchangeRatesContextProvider } from './contexts';
import { Error, Loading, Success } from './pages';
import { parseExchangeRates, withDefaultValues } from './utils';

const EXCHANGE_RATES_URL =
  'https://www.cnb.cz/en/financial-markets/foreign-exchange-market/central-bank-exchange-rate-fixing/central-bank-exchange-rate-fixing/daily.txt';

const getApiUrl = () => {
  const timestamp = Date.now();

  const url = new URL(EXCHANGE_RATES_URL);

  url.searchParams.append('timestamp', `${timestamp}`);

  return `https://api.allorigins.win/raw?url=${encodeURI(url.toString())}`;
};

const fetchExchangeRates = async () => {
  return await fetch(getApiUrl())
    .then((res) => res.text())
    .then(parseExchangeRates);
};

export const App = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ['fetchExchangeRates'],
    queryFn: fetchExchangeRates,
    retry: 1,
  });

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <Error error={error} />;
  }

  return (
    <ExchangeRatesContextProvider data={withDefaultValues(data)}>
      <Success />
    </ExchangeRatesContextProvider>
  );
};
