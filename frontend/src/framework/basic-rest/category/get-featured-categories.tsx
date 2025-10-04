import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import http from '@framework/utils/http';
import { useQuery } from 'react-query';

export const getCategoriesByFeatured = async (route: any) => {
  const { data } = await http.get(
    API_ENDPOINTS.CATEGORIES + route.queryKey[0] + '&sort=name'
  );
  return { data: data.docs as any[] };
};

export const useFeaturedCategories = (route: any) => {
  return useQuery<{ data: any[] }, Error>([route], getCategoriesByFeatured);
};
