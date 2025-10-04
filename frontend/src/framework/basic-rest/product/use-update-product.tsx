import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import http from '@framework/utils/http';
import { useMutation } from 'react-query';

interface productUpdateI {
  input: any;
  product: string;
}

async function productUpdate(input: any, product: string): Promise<any> {
  const {
    data: { doc, message },
  } = await http.put(API_ENDPOINTS.PRODUCTS + product, input);
  return { doc, message };
}
export const useUpdateProduct = () => {
  return useMutation(
    ({ input, product }: productUpdateI) => productUpdate(input, product),
    {
      onSuccess: (data) => {
        return data;
      },
      onError: (data) => {
        console.log(data, 'Product update error response');
      },
    }
  );
};
