import { useUI } from '@contexts/ui.context';
import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import http from '@framework/utils/http';
import Cookies from 'js-cookie';
import Router, { useRouter } from 'next/router';
import { useMutation } from 'react-query';

export interface LoginInputType {
  email: string;
  password: string;
  remember_me: boolean;
}
async function logout() {
  const { data, status } = await http.post(API_ENDPOINTS.LOGOUT);
  return {
    ok: true,
    message: 'Logout Successful!',
    status,
  };
}
export const useLogoutMutation = () => {
  const { unauthorize } = useUI();
  const router = useRouter();
  return useMutation(() => logout(), {
    onSuccess: async (_data) => {
      Cookies.remove('auth_token');
      Cookies.remove('user');
      unauthorize();
      router.reload();
    },
    onError: (data) => {
      Cookies.remove('auth_token');
      Cookies.remove('user');
      unauthorize();
      Router.push('/');
      router.reload();
    },
  });
};
