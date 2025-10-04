import http from '@framework/utils/http';
import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import { useMutation } from 'react-query';

interface AddressQuery {
  id: any;
}

const deleteAddress = async (id: any) => {
  const { data } = await http.put(`${API_ENDPOINTS.ADDRESS}${id}`, {
    is_active: false,
  });
  return {
    data: data,
  };
};

const useDeleteAddress = () => {
  return useMutation(async ({ id }: AddressQuery) => await deleteAddress(id), {
    onSuccess: async (data) => {
      return true;
    },
    onError: async (data) => {
      console.log(data, 'login error response');
      return false;
    },
  });
};

export { useDeleteAddress, deleteAddress };
