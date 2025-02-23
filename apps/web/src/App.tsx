import ErrorBoundary from '@pages/ErrorBoundary';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router';

import { Suspense, useEffect } from 'react';

import type { ReactNode } from 'react';
import { ErrorPage } from '@pages/ErrorPage';
import { Rates } from '@pages/Rates';
import { CoinDetails } from '@pages/CoinDetails';

const makeSuspended = (lazyNode: ReactNode) => <Suspense fallback={false}>{lazyNode}</Suspense>;

const RedirectToRates = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate(`/rates`);
  }, []);

  return false;
};

export const App = () => (
  <ErrorBoundary>
    <BrowserRouter>
      <Routes>
        <Route index path="/rates" element={<Rates />} />
        <Route path="/rates/:coinName" element={makeSuspended(<CoinDetails />)} />
        <Route path="/" element={<RedirectToRates />} />
        <Route path="*" element={makeSuspended(<ErrorPage />)} />
      </Routes>
    </BrowserRouter>
  </ErrorBoundary>
);
