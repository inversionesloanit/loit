import http from '@framework/utils/http';
import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import { useQuery } from 'react-query';

interface exchange {
  id: string;
  price: any;
  is_active: true;
  createdAt: string;
  updatedAt: string;
}

export const fetchExchange = async () => {
  const {
    data: { docs },
  } = await http.get(
    'https://adonai.inverloan.com/api/exchange?sort=-createdAt&where[is_active][equals]=true&limit=1'
  );
  return { docs };
};
export const useExchangeQuery = () => {
  return useQuery<{ docs: exchange[] }, Error>([''], fetchExchange);
};
