import { QueryOptionsType, Product } from '@framework/types';
import http from '@framework/utils/http';
import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import { useQuery } from 'react-query';
import qs from 'qs';

export const fetchSearchedProducts = async ({ queryKey }: any) => {
  const [_key, _params] = queryKey;

  const queryStructure = {
    title: {
      contains: _params.text,
    },
    quantity: {
      greater_than_equal: 1,
    },
  };
  const stringify = qs.stringify(
    { where: queryStructure },
    { addQueryPrefix: true }
  );
  const {
    data: { docs },
  } = await http.get(API_ENDPOINTS.PRODUCTS + stringify + '&limit=30');

  function searchProduct(product: any) {
    return product.title.toLowerCase().indexOf(_params.text.toLowerCase()) > -1;
  }

  return docs.filter(searchProduct);
};
export const useSearchQuery = (options: QueryOptionsType) => {
  return useQuery<Product[], Error>(
    [API_ENDPOINTS.SEARCH, options],
    fetchSearchedProducts
  );
};
