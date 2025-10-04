import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import http from '@framework/utils/http';
import { useMutation } from 'react-query';

export interface CheckoutInputType {
  number: any;
  total: number;
  user: string;
  products: any[];
  address: string;
  paymentGateway: string;
  notes: string;
}
async function checkout(input: any): Promise<any> {
  const {
    data: { doc, message },
  } = await http.post(API_ENDPOINTS.ORDER, input);
  return { doc, message };
}
export const useCheckoutMutation = () => {
  return useMutation((input: any) => checkout(input), {
    onSuccess: (data) => {
      return data;
    },
    onError: (data) => {
      console.log(data, 'Checkout error response');
    },
  });
};
