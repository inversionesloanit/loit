import http from '@framework/utils/http';
import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import { useQuery } from 'react-query';
import Cookies from 'js-cookie';

const fetchAddress = async () => {
  const cookies = Cookies;
  const userId = cookies.get('user');
  const { data } = await http.get(
    `${
      API_ENDPOINTS.ADDRESS
    }?where[usedByUsers][equals]=${userId}&where[is_active][equals]=${true}`
  );
  return {
    data: data,
  };
};

const useAddressQuery = () => {
  return useQuery([API_ENDPOINTS.ADDRESS], fetchAddress);
};

export { useAddressQuery, fetchAddress };
