import { Product } from '@framework/types';
import http from '@framework/utils/http';
import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import { useQuery } from 'react-query';
import qs from 'qs';

export const fetchProduct = async (_slug: string) => {
  const query = {
    slug: {
      equals: _slug,
    },
  };

  const stringifiedQuery = qs.stringify(
    {
      where: query,
    },
    { addQueryPrefix: true }
  );
  const {
    data: { docs },
  } = await http.get(`${API_ENDPOINTS.PRODUCT}` + stringifiedQuery);
  return docs[0];
};
export const useProductQuery = (slug: string) => {
  return useQuery<Product, Error>([API_ENDPOINTS.PRODUCT, slug], () =>
    fetchProduct(slug)
  );
};
