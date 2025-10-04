import { QueryOptionsType, Product } from '@framework/types';
import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import http from '@framework/utils/http';
import shuffle from 'lodash/shuffle';
import { useInfiniteQuery } from 'react-query';
type PaginatedProduct = {
  data: Product[];
  paginatorInfo: any;
};
const fetchCategory = async ({ queryKey }: any) => {
  const [_key, _params] = queryKey;
  const { data } = await http.get(API_ENDPOINTS.PRODUCTS + _params.category);
  return {
    data: shuffle(data) as Product[],
    paginatorInfo: {
      nextPageUrl: '',
    },
  };
};

const useFindOneCategoryQuery = (options: QueryOptionsType) => {
  return useInfiniteQuery<PaginatedProduct, Error>(
    [API_ENDPOINTS.PRODUCTS, options],
    fetchCategory,
    {
      getNextPageParam: ({ paginatorInfo }) => paginatorInfo.nextPageUrl,
    }
  );
};

export { useFindOneCategoryQuery, fetchCategory };
