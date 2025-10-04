import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import http from '@framework/utils/http';
import Cookies from 'js-cookie';
import { useMutation } from 'react-query';

export interface UpdateUserType {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  phone?: string;
}

const cookies = Cookies;
async function updateUser(input: UpdateUserType) {
  const userId = cookies.get('user');
  const { data } = await http.put(API_ENDPOINTS.UPDATE_USER + userId, input);
  return data;
}
export const useUpdateUserMutation = () => {
  return useMutation((input: UpdateUserType) => updateUser(input), {
    onSuccess: (data) => {
      return data;
    },
    onError: (data: any) => {
      console.log(data?.response, 'UpdateUser error response');
    },
  });
};
