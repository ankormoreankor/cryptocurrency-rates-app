import './App.css';
import ErrorBoundary from './pages/ErrorPage/ErrorBoundary';
import { BrowserRouter, Route, Routes } from 'react-router';

import { Suspense } from 'react';

import type { ReactNode } from 'react';
import { ErrorPage } from './pages/ErrorPage/ErrorPage';
import { Rates } from './pages/Rates';
import { CoinDetails } from './pages/CoinDetails';

const makeSuspended = (lazyNode: ReactNode) => <Suspense fallback={false}>{lazyNode}</Suspense>;

export const App = () => (
  <ErrorBoundary>
    <BrowserRouter>
      <Routes>
        <Route index path="/rates" element={<Rates />} />
        <Route path="/rates/:coinId" element={<CoinDetails />} />
        <Route path="/" element={<Rates />} />
        <Route path="*" element={makeSuspended(<ErrorPage />)} />
      </Routes>
    </BrowserRouter>
  </ErrorBoundary>
);
