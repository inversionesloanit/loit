import Layout from '@components/layout/layout';
import AccountLayout from '@components/my-account/account-layout';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import AddressGrid from '@components/address/address-grid';
import { useAddressQuery } from '@framework/address/address';
import { GetStaticProps } from 'next';
import Seo from '@components/seo/seo';
import { useUI } from '@contexts/ui.context';
import { useRouter } from 'next/router';

export default function AccountDetailsPage() {
  const router = useRouter();
  let { data, isLoading } = useAddressQuery();
  const { isAuthorized } = useUI();
  if (router.isReady) {
    if (!isAuthorized) {
      router.push('/iniciar-sesion');
    }
  }
  return (
    <>
      <Seo
        title="Direcciones"
        description="Bienvenido al supermercado en línea más completo de Carabobo, Venezuela En nuestro sitio web, encontrarás una amplia variedad de productos."
        path="my-account/direcciones"
      />
      <AccountLayout>
        {!isLoading ? (
          <AddressGrid address={data?.data} />
        ) : (
          <div>Cargando...</div>
        )}
      </AccountLayout>
    </>
  );
}

AccountDetailsPage.Layout = Layout;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale!, [
        'common',
        'forms',
        'menu',
        'terms',
        'faq',
        'footer',
      ])),
    },
  };
};
