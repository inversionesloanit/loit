import Container from '@components/ui/container';
import Layout from '@components/layout/layout';
import ProductSingleDetails from '@components/product/product';
import Breadcrumb from '@components/ui/breadcrumb';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetServerSideProps } from 'next';
import Divider from '@components/ui/divider';
import TawkToComponent from '@components/common/tawk-to';

export default function ProductPage() {
  return (
    <>
      <Divider />
      <div className="pt-6 lg:pt-7">
        <Container>
          <Breadcrumb />
          <ProductSingleDetails />
        </Container>
      </div>

      {/*      <RelatedProductFeed uniqueKey="related-products" />
      <PopcornJerkyProductFeed />
   */}
      <TawkToComponent />
    </>
  );
}

ProductPage.Layout = Layout;

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale!, [
        'common',
        'forms',
        'menu',
        'footer',
      ])),
    },
  };
};
