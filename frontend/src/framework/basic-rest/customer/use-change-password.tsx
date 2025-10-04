import http from '@framework/utils/http';
import { useMutation } from 'react-query';

async function changePassword(input: any) {
  const {
    data: { token, user },
  } = await http.post(
    'https://adonai.inverloan.com/api/users/forgot-password',
    input
  );
  return {
    token,
    user,
  };
}
export const useChangePasswordMutation = () => {
  return useMutation(async (input) => await changePassword(input), {
    onSuccess: (_data) => {
      // console.log('Emitido el correo');
    },
    onError: (data) => {
      console.log(data, 'forget password error response');
    },
  });
};
