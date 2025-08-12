import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import './styles/theme.css';
import App from './App.tsx';
import ErrorBoundary from './ErrorBoundary.tsx';
import './i18n';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary fallback={<h1>Oops! Something broke. 😓</h1>}>
    <App />
    </ErrorBoundary>
  </StrictMode>,
);
