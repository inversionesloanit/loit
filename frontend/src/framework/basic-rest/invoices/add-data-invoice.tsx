import http from '@framework/utils/http';
import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import { useMutation } from 'react-query';

interface InvoiceQuery {
  address: string;
  dni: string;
  dniType: string;
  name: string;
  user: string;
}

const fetchPostInvoices = async (form: InvoiceQuery) => {
  const { data } = await http.post(API_ENDPOINTS.INVOICES, form);
  return {
    data: data,
  };
};

const useAddInvoiceQuery = () => {
  return useMutation(
    async ({ user, address, dni, dniType, name }: InvoiceQuery) =>
      await fetchPostInvoices({ user, address, dni, dniType, name }),
    {
      onSuccess: async (data) => {
        return true;
      },
      onError: async (data) => {
        console.log(data);
        return false;
      },
    }
  );
};

export { useAddInvoiceQuery, fetchPostInvoices };
