import { useUI } from '@contexts/ui.context';
import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import http from '@framework/utils/http';
import Cookies from 'js-cookie';
import { useMutation } from 'react-query';

export interface SignUpInputType {
  email: string;
  password: string;
  name?: string;
  phone: string;
}
async function signUp(input: SignUpInputType) {
  const {
    data: { doc },
  } = await http.post(API_ENDPOINTS.REGISTER, input);
  return { doc };
}
export const useSignUpMutation = () => {
  const { authorize } = useUI();
  return useMutation((input: SignUpInputType) => signUp(input), {
    onSuccess: (data) => {
      true;
    },
    onError: (data) => {
      console.log(data, 'login error response');
    },
  });
};
