import { CategoriesQueryOptionsType, Category } from '@framework/types';
import http from '@framework/utils/http';
import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import { useQuery } from 'react-query';

export const fetchCategories = async ({ queryKey }: any) => {
  const [_key, _params] = queryKey;
  try {
    const response = await http.get(
      API_ENDPOINTS.CATEGORIES +
        '?limit=' +
        queryKey[1].limit +
        queryKey[1].where +
        '&sort=name'
    );
    console.log('API Response for Categories:', response);
    const { data: { docs, totalDocs } } = response;
    return { categories: { data: docs as Category[] } };
  } catch (error) {
    console.error('Error fetching categories:', error);
    // Puedes lanzar el error o devolver una estructura de datos vacía/por defecto
    throw new Error('Failed to fetch categories');
  }
};

export const useCategoriesQuery = (options: CategoriesQueryOptionsType) => {
  return useQuery<{ categories: { data: Category[] } }, Error>(
    [API_ENDPOINTS.CATEGORIES, options],
    fetchCategories
  );
};
