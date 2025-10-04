import Layout from '@components/layout/layout';
import ChangePassword from '@components/my-account/change-password';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetStaticProps } from 'next';
import Seo from '@components/seo/seo';
import Container from '@components/ui/container';

export default function ChangePasswordPage() {
  return (
    <>
      <Seo
        title="Cambiar contraseña"
        description="Bienvenido al supermercado en línea más completo de Carabobo, Venezuela En nuestro sitio web, encontrarás una amplia variedad de productos."
        path="nueva-contrasena"
      />
      <Container>
        <div className="pt-10 2xl:pt-12 pb-12 lg:pb-14 xl:pb-16 2xl:pb-20 xl:max-w-screen-xl 2xl:max-w-[1300px] mx-auto">
          <div className="flex flex-col w-full lg:flex-row">
            <div className="w-full p-4 mt-4 border rounded-md lg:mt-0 border-border-base sm:p-5 lg:py-8 2xl:py-10 lg:px-7 2xl:px-12">
              <ChangePassword />
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}

ChangePasswordPage.Layout = Layout;

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
