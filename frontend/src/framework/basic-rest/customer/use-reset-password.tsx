import http from '@framework/utils/http';
import { useMutation } from 'react-query';

export interface ResetPasswordType {
  token: string;
  password: string;
}
async function resetPassword(input: any) {
  const {
    data: { token, user },
  } = await http.post(
    'https://adonai.inverloan.com/api/users/reset-password',
    input
  );
  return {
    token,
    user,
  };
}
export const useResetPasswordMutation = () => {
  return useMutation((input: any) => resetPassword(input), {
    onSuccess: (data) => {
      // console.log('ChangeEmail success response');
    },
    onError: (data) => {
      console.log(data, 'ChangeEmail error response');
    },
  });
};
