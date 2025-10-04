import { QueryOptionsType, Category } from '@framework/types';
import http from '@framework/utils/http';
import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import { useQuery } from 'react-query';

export const fetchCategory = async ({ queryKey }: any) => {
  const [_key, _params] = queryKey;
  const {
    data: { docs },
  } = await http.get(API_ENDPOINTS.CATEGORIES + _params.slug);
  return { category: { docs } };
};
export const useCategoriesQuery = (options: any) => {
  return useQuery<{ category: { docs: Category[] } }, Error>(
    [API_ENDPOINTS.CATEGORIES, options],
    fetchCategory
  );
};
