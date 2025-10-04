import { QueryOptionsType, Product } from '@framework/types';
import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import http from '@framework/utils/http';
import shuffle from 'lodash/shuffle';
import { useInfiniteQuery } from 'react-query';
type PaginatedProduct = {
  data: Product[];
  paginatorInfo: any;
};
/**
 * It fetches products from the API and returns the data and paginator info
 * @param {any}  - queryKey - This is the key that you pass to the useQuery hook.
 * @returns An object with a data property and a paginatorInfo property.
 */
const fetchProducts = async ({ queryKey }: any) => {
  const [_key, _params] = queryKey;
  const { data } = await http.get(API_ENDPOINTS.PRODUCTS + _params.category);
  return {
    data: shuffle(data.docs) as Product[],
    paginatorInfo: {
      pages: {
        hasNextPage: data.hasNextPage,
        hasPrevPage: data.hasPrevPage,
        nextPage: data.nextPage,
        page: data.page,
        pagingCounter: data.pagingCounter,
        prevPage: data.prevPage,
        totalPages: data.totalPages,
      },
      nextPageUrl: '',
    },
  };
};

const useProductsQuery = (options: QueryOptionsType) => {
  return useInfiniteQuery<PaginatedProduct, Error>(
    [API_ENDPOINTS.PRODUCTS, options],
    fetchProducts,
    {
      getNextPageParam: ({ paginatorInfo }) => paginatorInfo.pages.nextPage,
    }
  );
};

export { useProductsQuery, fetchProducts };
