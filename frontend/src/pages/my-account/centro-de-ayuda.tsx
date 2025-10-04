import Layout from '@components/layout/layout';
import AccountLayout from '@components/my-account/account-layout';
import Help from '@components/my-account/help';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetStaticProps } from 'next';
import Seo from '@components/seo/seo';
import { useUI } from '@contexts/ui.context';
import { useRouter } from 'next/router';

export default function HelpCenter() {
  const router = useRouter();
  const { isAuthorized } = useUI();
  if (router.isReady) {
    if (!isAuthorized) {
      router.push('/iniciar-sesion');
    }
  }
  return (
    <>
      <Seo
        title="Centro de ayuda"
        description="Bienvenido al supermercado en línea más completo de Carabobo, Venezuela En nuestro sitio web, encontrarás una amplia variedad de productos."
        path="my-account/centro-de-ayuda"
      />
      <AccountLayout>
        <Help />
      </AccountLayout>
    </>
  );
}

HelpCenter.Layout = Layout;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale!, [
        'common',
        'forms',
        'menu',
        'help',
        'footer',
      ])),
    },
  };
};
