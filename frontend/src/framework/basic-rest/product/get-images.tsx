import { Images } from '@framework/types';
import http from '@framework/utils/http';
import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import { useQuery } from 'react-query';

export const fecthImage = async (_slug: string) => {
  const { data } = await http.get(`${API_ENDPOINTS.IMAGES}` + _slug);
  return data;
};
export const useImageQuery = (slug: string) => {
  return useQuery<Images, Error>([API_ENDPOINTS.IMAGES, slug], () =>
    fecthImage(slug)
  );
};
