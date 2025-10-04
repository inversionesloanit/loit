import { Product } from '@framework/types';
import http from '@framework/utils/http';
import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import { useQuery } from 'react-query';

export type TypeQueryProducysByCategory = {
  docs: Product[];
  hasNextPage: boolean;
  hasPrevPage: boolean;
  limit: 10;
  nextPage: null;
  page: 1;
  pagingCounter: 1;
  prevPage: null;
  totalDocs: 2;
  totalPages: 1;
};

export const fetchProductsByCategory = async ({ queryKey }: any) => {
  const [_key, _params] = queryKey;
  const { data } = await http.get(`${API_ENDPOINTS.PRODUCTS}${_params.query}`);
  return data as TypeQueryProducysByCategory;
};
export const useProductsByCategory = (options: any) => {
  return useQuery<TypeQueryProducysByCategory, Error>(
    [API_ENDPOINTS.PRODUCTS, options],
    fetchProductsByCategory
  );
};
