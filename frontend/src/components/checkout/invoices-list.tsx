import { useInvoicesQuery } from '@framework/invoices/invoice';
import InvoiceGrid from './invoice';

const InvoiceList: React.FC<{ callback: Function }> = ({ callback }) => {
  let { data, isLoading } = useInvoicesQuery();
  const getInvoiceSelected = (item: any) => {
    callback(item);
  };
  return !isLoading ? (
    <InvoiceGrid invoice={data?.data} callback={getInvoiceSelected} />
  ) : (
    <div>Loading...</div>
  );
};

export default InvoiceList;
