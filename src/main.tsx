import React from 'react';
import ReactDOM from 'react-dom/client';

import { App } from './App.tsx';
import GlobalStyles from './GlobalStyles.tsx';
import { QueryClientContextProvider } from './contexts';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientContextProvider>
      <GlobalStyles />

      <App />
    </QueryClientContextProvider>
  </React.StrictMode>,
);
