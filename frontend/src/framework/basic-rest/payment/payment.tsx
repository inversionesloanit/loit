import http from '@framework/utils/http';
import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import { useQuery } from 'react-query';

const fetchPayment = async () => {
  const {
    data: { docs },
  } = await http.get(API_ENDPOINTS.PAYMENT);
  return docs;
};

const usePaymentQuery = () => {
  return useQuery([API_ENDPOINTS.PAYMENT], fetchPayment);
};

export { usePaymentQuery, fetchPayment };
