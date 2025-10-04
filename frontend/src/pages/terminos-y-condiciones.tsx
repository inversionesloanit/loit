import Layout from '@components/layout/layout';
import Container from '@components/ui/container';
import PageHeroSection from '@components/ui/page-hero-section';
import { termsAndServices } from '@settings/terms-settings';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { GetStaticProps } from 'next';
import DownloadApps from '@components/common/download-apps';
import Heading from '@components/ui/heading';
import Seo from '@components/seo/seo';

export default function TermsPage() {
  const { t } = useTranslation('terms');
  return (
    <>
      <Seo
        title="Terminos y condicioness"
        description="Bienvenido al supermercado en línea más completo de Carabobo, Venezuela En nuestro sitio web, encontrarás una amplia variedad de productos."
        path="terms"
      />
      <PageHeroSection heroTitle="text-page-terms-condition" />
      <div className="py-12 lg:py-16 2xl:py-20">
        <Container>
          <div className="w-full xl:max-w-[1200px] mx-auto">
            <div className="text-center">
              <h1 className="text-brand-dark text-base xl:text-lg xl:leading-7 font-semibold font-manrope mb-4 lg:mb-6 font-body">
                Términos y Condiciones de Uso de la plataforma ecommerce de
                inverloan.com:
              </h1>
              {/**
<h1>ÚLTIMA FECHA DE ACTUALIZACIÓN: 10/04/2023</h1>
               */}
            </div>
            {termsAndServices?.map((item) => (
              // @ts-ignore
              <div
                key={item.title}
                className="mb-8 lg:mb-12 last:mb-0 order-list-enable"
              >
                <Heading className="mb-4 lg:mb-6 font-body" variant="title">
                  {t(item.title)}
                </Heading>
                <div
                  className="text-brand-muted text-sm lg:text-15px leading-7 space-y-5"
                  dangerouslySetInnerHTML={{
                    __html: t(item.description),
                  }}
                />
              </div>
            ))}
          </div>
        </Container>
      </div>
    </>
  );
}

TermsPage.Layout = Layout;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale!, [
        'common',
        'forms',
        'menu',
        'terms',
        'footer',
      ])),
    },
  };
};
