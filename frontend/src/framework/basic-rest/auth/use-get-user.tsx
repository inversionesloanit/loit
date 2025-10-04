import { QueryOptionsType, Product } from '@framework/types';
import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import http from '@framework/utils/http';
import { useInfiniteQuery, useQuery } from 'react-query';
type PaginatedProduct = {
  data: any;
};
const fetchUser = async () => {
  const { data } = await http.get(API_ENDPOINTS.USER);
  return { data };
};

const useGetUser = (options?: QueryOptionsType) => {
  return useQuery<PaginatedProduct, Error>(
    [API_ENDPOINTS.PRODUCTS, options],
    async () => await fetchUser()
  );
};

export { useGetUser, fetchUser };
