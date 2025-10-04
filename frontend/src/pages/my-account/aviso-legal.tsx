import Layout from '@components/layout/layout';
import AccountLayout from '@components/my-account/account-layout';
import Legal from '@components/my-account/notice';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetStaticProps } from 'next';
import Seo from '@components/seo/seo';
import { useRouter } from 'next/router';
import { useUI } from '@contexts/ui.context';

export default function LegalNotice() {
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
        title="Aviso Legal"
        description="Bienvenido al supermercado en línea más completo de Carabobo, Venezuela En nuestro sitio web, encontrarás una amplia variedad de productos."
        path="aviso-legal"
      />
      <AccountLayout>
        <Legal />
      </AccountLayout>
    </>
  );
}

LegalNotice.Layout = Layout;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale!, [
        'common',
        'forms',
        'menu',
        'legal',
        'footer',
      ])),
    },
  };
};
