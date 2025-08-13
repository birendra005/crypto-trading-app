import { useState, useEffect } from 'react';
import './HomePage.css';
import Button from '../../components/Button';
import Table from '../../components/Table';
import { useCryptoAssets, type CryptoAsset } from '../../hooks/useCrystoAssets';
import Loader from '../../components/Loader';
import { useTranslation } from 'react-i18next';

export const HomePage = () => {
  const [limit, setLimit] = useState(10);
  const [allData, setAllData] = useState<CryptoAsset[]>([]);
  const { data, isLoading } = useCryptoAssets(limit);

  const [showInitialLoader, setShowInitialLoader] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowInitialLoader(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (data && data.length > allData.length) {
      setAllData(data);
    }
  }, [data]);

  const loadMore = () => {
    setLimit(prev => prev + 10);
  };

  const columns = [
    { key: 'name', header: 'Name' },
    { key: 'symbol', header: 'Symbol' },
    { key: 'current_price', header: 'Price ($)' },
    {
      key: 'actions',
      header: 'Actions',
      render: () => (
        <div className="actions">
          <Button>Buy</Button>
          <Button variant="secondary">Sell</Button>
        </div>
      ),
    },
  ];

  return (
    <div className="home-page">
      <h2> {t('cryptoAssets')}</h2>

      {showInitialLoader ? (
        <div style={{ marginTop: '20%' }}>
          <Loader />{' '}
        </div>
      ) : (
        <>
          <Table columns={columns} data={allData} loading={isLoading} />

          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              marginBlock: '10px',
            }}
          >
            <Button onClick={loadMore} disabled={isLoading}>
              {isLoading ? t('loading') : t('loadMore')}
            </Button>
          </div>
        </>
      )}
    </div>
  );
};
