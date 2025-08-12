import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export interface CryptoAsset {
  id: string;
  name: string;
  symbol: string;
}

export const useCryptoAssets = (limit: number) => {
  return useQuery<CryptoAsset[], Error>({
    queryKey: ['cryptoAssets', limit],
    queryFn: async () => {
      const { data } = await axios.get(
        'https://api.coingecko.com/api/v3/coins/markets',
        {
          params: {
            vs_currency: 'usd',
            order: 'market_cap_desc',
            per_page: limit,
            page: 1,
            sparkline: false,
          },
        },
      );
      return data;
    },
  });
};
