import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Header } from '../components/Header';
import { Suspense, lazy } from 'react';

const HomePage = lazy(() => import('../pages/homePage'));
const TradePage = lazy(() => import('../pages/tradePage'));

export const AppRouter = () => (
  <Router basename="/crypto-trading-app/">
    <Header />
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/trade" element={<TradePage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Suspense>
  </Router>
);
