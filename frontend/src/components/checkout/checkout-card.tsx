import Link from 'next/link';
import usePrice from '@framework/product/use-price';
import { useCart } from '@contexts/cart/cart.context';
import Text from '@components/ui/text';
import Button from '@components/ui/button';
import { CheckoutItem } from '@components/checkout/checkout-card-item';
import { CheckoutCardFooterItem } from './checkout-card-footer-item';
import { useTranslation } from 'next-i18next';
import Router from 'next/router';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useCheckoutMutation } from '@framework/checkout/use-checkout';
import { useExchangeQuery } from '@framework/checkout/use-exchange';
import { useUpdateProduct } from '@framework/product/use-update-product';

const CheckoutCard: React.FC<{ disabled: boolean; data: any }> = ({
  disabled,
  data,
}) => {
  const { t } = useTranslation('common');
  const { items, total, isEmpty, resetCart } = useCart();
  const [loading, setLoading] = useState(true);
  const cookies = Cookies;
  const [tax, setTax] = useState<number>(0);
  const { price: subtotal } = usePrice({
    amount: total,
    currencyCode: 'USD',
  });
  const { reset, isLoading, mutateAsync: checkout } = useCheckoutMutation();
  const [isError, setIsError] = useState(false);
  const dataExchange = useExchangeQuery();
  const {
    reset: resetUpdate,
    mutateAsync: updateProduct,
    isLoading: isLoadingProduct,
  } = useUpdateProduct();

  const [order, setOrder] = useState({
    number: Math.floor(
      Math.random() * (9999999 - 99999 + 1) + 99999
    ).toString(),
    total: total,
    user: cookies.get('user'),
    products: [{}],
    address: '',
    paymentGateway: '',
    notes: '',
    exchange: '',
    invoice: '',
    status: '64f0b3929d350e841dbdbb14',
    paymentCash: undefined,
    bankInfo: undefined,
  });
  const checkoutFooter = [
    /* 
        {
      id: 1,
      name: t('text-sub-total'),
      price: subtotal,
    },
    */
    {
      id: 1,
      name: t('text-total'),
      price: subtotal,
    },
  ];

  function orderHeader() {
    setIsError(false);
    checkout(order)
      .then(({ doc }) => {
        order.products.map(async (item: any) => {
          const stock = item.stock - item.quantity;
          const { data: dataProduct } = await updateProduct({
            input: { quantity: stock },
            product: item.product,
          });
        });
        reset();
        resetCart();
        Router.push('my-account/ordenes/' + doc.id);
      })
      .catch((e) => {
        setIsError(true);
        console.log(e);
        reset();
      });
    // !isEmpty && Router.push(ROUTES.ORDER);
  }
  const parsingProducts = (): any[] => {
    let products: any[] = [];
    let taxes = 0;
    items.map((item: any) => {
      taxes += item.price * (item.tax / 100) * item.quantity;
      products.push({
        product: item.id,
        quantity: item.quantity,
        stock: item.stock,
        price: item.price,
        taxTotal: item.price * (item.tax / 100) * item.quantity,
      });
    });
    setTax(taxes);
    return products;
  };

  /* A hook that is executed when the component is mounted and when the data changes. */
  useEffect(() => {
    const totalWithTax = (total + tax).toFixed(2);
    setOrder({
      ...order,
      address: data.address.id,
      paymentGateway: data.paymentGateway.paymentGateway,
      notes: data.notes.textarea,
      total: parseFloat(totalWithTax),
      products: parsingProducts(),
      invoice: data.invoice.id,
      bankInfo: data.bankInfo,
      exchange: dataExchange.data?.docs[0].id
        ? dataExchange.data?.docs[0].id
        : '',
      paymentCash: data.paymentCash,
    });
  }, [data, dataExchange.data]);
  /* This is a hook that is executed when the component is mounted and when the data changes. */
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setLoading(true);
    }
    setLoading(false);
  }, []);

  if (loading) {
    return <p>Cargando...</p>;
  }
  return (
    <>
      <div className="px-4 py-1 mb-20 border rounded-md border-border-base text-brand-light xl:py-6 xl:px-7">
        <div className="flex pb-2 text-sm font-semibold rounded-md text-heading">
          <span className="font-medium text-15px text-brand-dark">
            {t('text-product')}
          </span>
          <span className="font-medium ltr:ml-auto rtl:mr-auto shrink-0 text-15px text-brand-dark">
            {t('text-sub-total')}
          </span>
        </div>
        {!isEmpty ? (
          items.map((item) => <CheckoutItem item={item} key={item.id} />)
        ) : (
          <p className="py-4 text-brand-danger text-opacity-70">
            {t('text-empty-cart')}
          </p>
        )}
        {checkoutFooter.map(
          (item: any) =>
            dataExchange.data?.docs[0] && (
              <CheckoutCardFooterItem
                item={item}
                total={total}
                tax={tax}
                exchange={dataExchange.data?.docs[0]}
                key={item.id}
              />
            )
        )}
        <Button
          loading={isLoading || isLoadingProduct}
          disabled={disabled}
          variant="formButton"
          className={`w-full mt-8 mb-5 bg-brand text-brand-light rounded font-semibold px-4 py-3 transition-all ${
            isEmpty && 'opacity-40 cursor-not-allowed'
          }`}
          onClick={orderHeader}
        >
          {t('button-order-now')}
        </Button>
        {isError && (
          <div
            className="flex p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50"
            role="alert"
          >
            <span className="sr-only">Info</span>
            <div>
              <span className="font-medium">Alerta!</span> Ha habido un
              problema, por favor, vuelva a intentarlo.
            </div>
          </div>
        )}
      </div>
      {/* 
      <Text className="mt-8">
        {t('text-by-placing-your-order')}{' '}
        <Link href={ROUTES.TERMS}>
          <a className="font-medium underline text-brand">
            {t('text-terms-of-service')}{' '}
          </a>
        </Link>
        {t('text-and')}{' '}
        <Link href={ROUTES.PRIVACY}>
          <a className="font-medium underline text-brand">
            {t('text-privacy')}
          </a>
        </Link>
        . {t('text-credit-debit')}
      </Text>
      <Text className="mt-4">{t('text-bag-fee')}</Text>
      */}
    </>
  );
};

export default CheckoutCard;
