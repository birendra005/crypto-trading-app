import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { Header } from '../components/Header';
import { HomePage } from '../pages/homePage';
import TradePage from '../pages/tradePage';

export const AppRouter = () => (
  // element={isLoggedIn ? <TradePage /> : <Navigate to="/" />}
  <Router>
    <Header />
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/trade" element={<TradePage />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  </Router>
);
