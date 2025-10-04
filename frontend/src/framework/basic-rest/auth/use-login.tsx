import { useUI } from '@contexts/ui.context';
import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import http from '@framework/utils/http';
import Cookies from 'js-cookie';
import { useMutation } from 'react-query';
import { useRouter } from 'next/router';

export interface LoginInputType {
  email: string;
  password: string;
}
async function login(input: LoginInputType): Promise<any> {
  const {
    data: { token, user },
  } = await http.post(API_ENDPOINTS.LOGIN, input);
  Cookies.set('auth_token', token);
  Cookies.set('user', user.id);
  return {
    token,
    user,
  };
}
export const useLoginMutation = () => {
  const { authorize } = useUI();
  const router = useRouter();
  return useMutation(async (input: LoginInputType) => await login(input), {
    onSuccess: async (data) => {
      authorize();
      router.reload();
      return true;
    },
    onError: async (data) => {
      console.log(data, 'login error response');
      return false;
    },
  });
};
export const getSession = () => {
  const session = Cookies.get('auth_token');
};
