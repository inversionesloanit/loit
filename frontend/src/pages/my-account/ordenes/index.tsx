import React from 'react';
import Layout from '@components/layout/layout';
import AccountLayout from '@components/my-account/account-layout';
import OrderTable from '@components/order/order-table';
import { useOrdersQuery } from '@framework/order/get-all-orders';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Seo from '@components/seo/seo';
import { useRouter } from 'next/router';
import { useUI } from '@contexts/ui.context';

// props change to orders.

export default function OrdersTablePage() {
  const router = useRouter();
  const { isAuthorized } = useUI();
  if (router.isReady) {
    if (!isAuthorized) {
      router.push('/iniciar-sesion');
    }
  }
  const { data, isLoading } = useOrdersQuery({});
  return (
    <>
      <Seo
        title="Ordenes"
        description="Bienvenido al supermercado en línea más completo de Carabobo, Venezuela En nuestro sitio web, encontrarás una amplia variedad de productos."
        path="my-account/ordeners"
      />
      <AccountLayout>
        {!isLoading ? (
          <OrderTable orders={data?.data} />
        ) : (
          <div>Cargando...</div>
        )}
      </AccountLayout>
    </>
  );
}

OrdersTablePage.Layout = Layout;

export const getStaticProps = async ({ locale }: any) => {
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
