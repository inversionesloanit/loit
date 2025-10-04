import { QueryOptionsType, Order } from '@framework/types';
import http from '@framework/utils/http';
import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import { useQuery } from 'react-query';
import Cookies from 'js-cookie';

const cookies = Cookies;

const fetchOrders = async ({ queryKey }: any) => {
  const [_key, _params] = queryKey;
  const { data: {docs} } = await http.get(API_ENDPOINTS.ORDERS + '?where[user][equals]=' + cookies.get('user'));
  return {
    data: docs,
  };
};

const useOrdersQuery = (options: QueryOptionsType) => {
  return useQuery([API_ENDPOINTS.ORDERS, options], fetchOrders);
};

export { useOrdersQuery, fetchOrders };
