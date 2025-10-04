import Layout from '@components/layout/layout';
import CheckoutCard from '@components/checkout/checkout-card';
import CheckoutDetails from '@components/checkout/checkout-details';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Divider from '@components/ui/divider';
import Seo from '@components/seo/seo';
import { useEffect, useState } from 'react';
import { useUI } from '@contexts/ui.context';
import { useRouter } from 'next/router';
import TawkToComponent from '@components/common/tawk-to';

export default function CheckoutPage() {
  const [disabled, setDisabled] = useState(true);
  const [checkout, setCheckout] = useState({
    address: { id: undefined },
    paymentGateway: { paymentGateway: undefined },
    paymentCash: undefined,
    notes: { textarea: undefined },
    invoice: { id: undefined },
  });
  const router = useRouter();

  const { isAuthorized } = useUI();
  if (router.isReady) {
    if (!isAuthorized) {
      router.push('/iniciar-sesion');
    }
  }

  useEffect(() => {
    if (
      checkout.address?.id != undefined &&
      checkout.paymentGateway?.paymentGateway != undefined &&
      checkout.invoice?.id != undefined
    ) {
      setDisabled(false);
    }
  }, [checkout]);

  return (
    <>
      <Seo
        title="Checkout"
        description="Bienvenido al supermercado en línea más completo de Carabobo, Venezuela En nuestro sitio web, encontrarás una amplia variedad de productos."
        path="checkout"
      />
      <div className="flex flex-col mx-auto xl:max-w-screen-xl">
        <div className="flex flex-col flex-wrap grid-cols-1 gap-x-7 xl:gap-x-8 lg:grid lg:grid-cols-12">
          <div className="w-full col-start-1 col-end-9">
            <CheckoutDetails
              callback={(item: any) => setCheckout({ ...checkout, ...item })}
            />
          </div>
          <div className="w-full col-start-9 col-end-13 mt-7 lg:mt-0">
            <CheckoutCard data={checkout} disabled={disabled} />
          </div>
        </div>
      </div>
      <Divider />
      <TawkToComponent />
    </>
  );
}

CheckoutPage.Layout = Layout;

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
