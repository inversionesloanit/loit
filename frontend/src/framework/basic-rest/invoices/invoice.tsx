import http from '@framework/utils/http';
import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import { useQuery } from 'react-query';
import Cookies from 'js-cookie';

const fetchInvoices = async () => {
  const cookies = Cookies;
  const userId = cookies.get('user');
  const { data } = await http.get(
    `${
      API_ENDPOINTS.INVOICES
    }?where[user][equals]=${userId}&where[is_active][equals]=${true}`
  );
  return {
    data: data,
  };
};

const useInvoicesQuery = () => {
  return useQuery([API_ENDPOINTS.INVOICES], fetchInvoices);
};

export { useInvoicesQuery, fetchInvoices };
