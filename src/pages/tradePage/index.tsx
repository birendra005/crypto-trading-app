import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import styles from './TradePage.module.css';
import { useAuthStore } from '../../stores/authStore';
import { getCryptoMarkets } from '../../services/api';
import Input from '../../components/InputField';
import Dropdown from '../../components/Dropdown';
import Button from '../../components/Button';
import { useTranslation } from 'react-i18next';

const TradePage = () => {
  const { isLoggedIn } = useAuthStore();
  const { t } = useTranslation();

  const [cryptoAmount, setCryptoAmount] = useState('');
  const [fiatAmount, setFiatAmount] = useState('');
  const [selectedCrypto, setSelectedCrypto] = useState('bitcoin');
  const [isCryptoToFiat, setIsCryptoToFiat] = useState(true);

  const { data: markets } = useQuery({
    queryKey: ['markets'],
    queryFn: getCryptoMarkets,
  });

  const selectedCryptoObj = markets?.find((c: { id: string }) => c.id === selectedCrypto);
  const price = selectedCryptoObj?.current_price || 0;

  useEffect(() => {
    if (cryptoAmount && isCryptoToFiat) {
      setFiatAmount((parseFloat(cryptoAmount) * price).toFixed(2));
    }
    if (fiatAmount && !isCryptoToFiat) {
      setCryptoAmount((parseFloat(fiatAmount) / price).toFixed(8));
    }
  }, [cryptoAmount, fiatAmount, price, isCryptoToFiat]);

  if (!isLoggedIn) {
    return <div className={styles.message}>{t('loginError')}</div>;
  }

  return (
    <div className={styles.container}>
      <h2>{t('trade')}</h2>
      <div className={styles.form}>
        <div className={styles.inputGroup}>
          <label>{isCryptoToFiat ? t('cryptoAmount') : t('fiatAmount')}</label>
          {isCryptoToFiat ? (
            <Input
              type="number"
              value={cryptoAmount}
              onChange={e => {
                const value = e.target.value;
                if (Number(value) >= 0 || value === '') {
                  setCryptoAmount(value);
                }
              }}
              placeholder="0.00"
              min="0"
            />
          ) : (
            <Input
              type="number"
              value={fiatAmount}
              onChange={e => {
                const value = e.target.value;
                if (Number(value) >= 0 || value === '') {
                  setFiatAmount(value);
                }
              }}
              placeholder="0.00"
              min="0"
            />
          )}
        </div>

        <Dropdown
          options={markets?.map((coin: { name: string; id: string }) => ({
            label: coin.name,
            value: coin.id,
          }))}
          value={selectedCrypto}
          onChange={setSelectedCrypto}
        />

        <div className={styles.swapButton}>
          <Button onClick={() => setIsCryptoToFiat(!isCryptoToFiat)}>{t('swap')}</Button>
        </div>

        <div className={styles.inputGroup}>
          <label>{isCryptoToFiat ? t('fiatUsdResult') : t('cryptoResult')}</label>
          {isCryptoToFiat ? (
            <Input value={fiatAmount} readOnly />
          ) : (
            <Input value={cryptoAmount} readOnly />
          )}
        </div>
      </div>
    </div>
  );
};

export default TradePage;
