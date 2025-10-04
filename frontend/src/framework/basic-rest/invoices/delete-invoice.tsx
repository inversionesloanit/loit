import http from '@framework/utils/http';
import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import { useMutation } from 'react-query';

interface InvoiceQuery {
  id: string;
}

const deleteInvoiceQuery = async ({ id }: InvoiceQuery) => {
  const { data } = await http.put(`${API_ENDPOINTS.INVOICES}/${id}`, {
    is_active: false,
  });
  return {
    data: data,
  };
};

const useDeleteInvoiceQuery = () => {
  return useMutation(
    async ({ id }: InvoiceQuery) => await deleteInvoiceQuery({ id }),
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

export { useDeleteInvoiceQuery, deleteInvoiceQuery };
