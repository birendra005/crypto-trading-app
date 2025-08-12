import './Header.css';
import { useNavigate } from 'react-router-dom';
import Button from '../Button';
import { useAuthStore, type User } from '../../stores/authStore';
import LoginModal from '../../pages/homePage/LoginModal';
import { useState } from 'react';
import userIcon from '../../assets/userIcon.png';
import logoutIcon from '../../assets/logoutIcon.png';
import { useTranslation } from 'react-i18next';

export const Header = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const { isLoggedIn, user, login, logout } = useAuthStore();
  const [openLoginModal, setOpenLoginModal] = useState<boolean>(false);
  const handleLogin = (user: User) => {
    login(user);
  };

  const handleCloseLoginModal = () => {
    setOpenLoginModal(false);
  };

  const onLogout = () => {
    navigate('/');
    logout();
  };

  return (
    <header className="header">
      <nav className="nav">
        <div
          className="nav-left"
          style={{ fontSize: '18px', fontWeight: 'bolder' }}
        >
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
              <div
                style={{
                  marginInline: '40px',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <img
                  src={userIcon}
                  alt="Profile"
                  style={{ width: '40px', height: '40px', borderRadius: '50%' }}
                />
                <p style={{ fontSize: '18px', fontWeight: 'bolder' }}>
                  {t('hi')}, {user?.name}
                </p>
              </div>
              <img
                src={logoutIcon}
                alt="Profile"
                style={{ width: '30px', height: '30px', borderRadius: '50%' }}
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
      <LoginModal
        open={openLoginModal}
        onClose={handleCloseLoginModal}
        onLogin={handleLogin}
      />
    </header>
  );
};
