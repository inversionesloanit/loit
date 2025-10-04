import http from '@framework/utils/http';
import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import { useMutation } from 'react-query';

interface AddressQuery {
  data: any;
  userId: any;
}

const fetchPostAddress = async (input: any, userId: any) => {
  const { data } = await http.post(API_ENDPOINTS.ADDRESS, input);
  return {
    data: data,
  };
};

const useAddAddressQuery = () => {
  return useMutation(
    async ({ userId, data }: AddressQuery) =>
      await fetchPostAddress(data, userId),
    {
      onSuccess: async (data) => {
        return true;
      },
      onError: async (data) => {
        console.log(data, 'login error response');
        return false;
      },
    }
  );
};

export { useAddAddressQuery, fetchPostAddress };

/* 

  return useMutation(async (input: LoginInputType) => await login(input), {
    onSuccess: async (data) => {
      Cookies.set('auth_token', data.token);
      Cookies.set('user', data.user.id);
      authorize();
      return true;
    },
    onError: async (data) => {
      console.log(data, 'login error response');
      return false;
    },
  });

*/
