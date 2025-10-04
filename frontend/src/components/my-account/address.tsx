import Layout from '@components/layout/layout';
import AddressGrid from '@components/address/address-grid';
import { useAddressQuery } from '@framework/address/address';
import Cookies from 'js-cookie';

export default function AccountDetailsPage() {
  const userId = Cookies.get('user');
  let { data, isLoading } = useAddressQuery({ userId });
  return (
    <div className="pt-4">
      {!isLoading ? (
        <AddressGrid address={data?.data} />
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}

AccountDetailsPage.Layout = Layout;
