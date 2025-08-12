import React from 'react';
import './Loader.css';
import loadingGif from '../../assets/loader.gif';
import { useTranslation } from 'react-i18next';

const Loader: React.FC = () => {
  const {t} = useTranslation();
  return (
    <div className="loader-container">
      <img src={loadingGif} alt="Loading..." className="loader-gif" />
      <p>{t('loading')}</p>
    </div>
  )
};

export default Loader;
