import Layout from '@components/layout/layout';
import AccountLayout from '@components/my-account/account-layout';
import OrderDetails from '@components/order/order-details';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useUI } from '@contexts/ui.context';
import { useEffect } from 'react';

export default function OrderPage() {
  const router = useRouter();
  const { isAuthorized } = useUI();
  useEffect(() => {
    if (router.isReady) {
      if (!isAuthorized) {
        router.push('/iniciar-sesion');
      }
    }
  }, []);
  return (
    <AccountLayout>
      <OrderDetails className="p-0" />
    </AccountLayout>
  );
}

OrderPage.Layout = Layout;

export const getServerSideProps: GetServerSideProps = async ({
  locale,
}: any) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        'common',
        'forms',
        'menu',
        'footer',
      ])),
    },
  };
};
