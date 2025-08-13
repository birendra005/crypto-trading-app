import './Header.css';
import { useNavigate } from 'react-router-dom';
import Button from '../Button';
import { useAuthStore, type User } from '../../stores/authStore';
import LoginModal from '../../pages/homePage/LoginModal';
import { useState } from 'react';
import userIcon from '../../assets/userIcon.png';
import logoutIcon from '../../assets/logoutIcon.png';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

export const Header = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const { isLoggedIn, user, login, logout } = useAuthStore();
  const [openLoginModal, setOpenLoginModal] = useState<boolean>(false);

  const handleLogin = (user: User) => {
    login(user);
    setTimeout(() => {
      toast.success(t('loginSuccess'));
    }, 500);
  };

  const handleCloseLoginModal = () => {
    setOpenLoginModal(false);
  };

  const onLogout = () => {
    navigate('/');
    logout();
    setTimeout(() => {
      toast.success(t('logoutSuccess'));
    }, 500);
  };

  return (
    <header className="header">
      <nav className="nav">
        <div className="nav-left">
          <span className="nav-item" onClick={() => navigate('/')}>
            {t('home')}
          </span>
          <span className="nav-item" onClick={() => navigate('/trade')}>
            {t('trade')}
          </span>
        </div>
        <div className="nav-right">
          {isLoggedIn ? (
            <div className="user-info">
              <div className="user-info-details">
                <img src={userIcon} alt="Profile" className="user-info-icon" />
                <p>
                  {t('hi')}, {user?.name}
                </p>
              </div>
              <img
                src={logoutIcon}
                alt="Profile"
                className="logout-icon"
                onClick={() => {
                  onLogout();
                }}
              />
            </div>
          ) : (
            <Button
              onClick={() => {
                setOpenLoginModal(true);
              }}
            >
              {' '}
              {t('login')}
            </Button>
          )}
        </div>
      </nav>
      <LoginModal open={openLoginModal} onClose={handleCloseLoginModal} onLogin={handleLogin} />
    </header>
  );
};
