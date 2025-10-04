import Scrollbar from '@components/ui/scrollbar';
import { useCart } from '@contexts/cart/cart.context';
import { useUI } from '@contexts/ui.context';
import usePrice from '@framework/product/use-price';
import CartItem from './cart-item';
import EmptyCart from './empty-cart';
import Link from '@components/ui/link';
import { ROUTES } from '@utils/routes';
import cn from 'classnames';
import { useTranslation } from 'next-i18next';
import Heading from '@components/ui/heading';
import Text from '@components/ui/text';
import DeleteIcon from '@components/icons/delete-icon';

export default function CartSidebar() {
  const { t } = useTranslation('common');
  const { closeDrawer } = useUI();
  const { items, total, isEmpty, resetCart } = useCart();
  const { price: cartTotal } = usePrice({
    amount: total,
    currencyCode: 'USD',
  });
  const { isAuthorized } = useUI();
  return (
    <div className="flex flex-col justify-between w-full h-full">
      <div className="relative flex items-center justify-between w-full px-5 py-5 border-b border-gray-base md:px-7">
        <Heading variant="titleMedium">Carrito de compra</Heading>
        <div className="flex items-center">
          {!isEmpty && (
            <button
              className="flex items-center flex-shrink transition duration-150 ease-in opacity-50 text-15px focus:outline-none text-brand-dark hover:opacity-100 "
              aria-label='Eliminar todo'
              onClick={resetCart}
            >
              <DeleteIcon />
              <span className="px-1 lg:rtl:pr-1">Eliminar todo</span>
            </button>
          )}
        </div>
      </div>
      {!isEmpty ? (
        <Scrollbar className="flex-grow w-full cart-scrollbar">
          <div className="w-full px-5 md:px-7">
            {items?.map((item) => (
              <CartItem item={item} key={item.id} />
            ))}
          </div>
        </Scrollbar>
      ) : (
        <EmptyCart />
      )}
      <div className="px-5 pt-5 pb-5 border-t border-border-base md:px-7 md:pt-6 md:pb-6">
        <div className="flex pb-5 md:pb-7">
          <div className="ltr:pr-3 rtl:pl-3">
            <Heading className="mb-2.5">Subtotal:</Heading>
            <Text className="leading-6">
              {isAuthorized ? (
                'Descuento en el precio final del carrito'
              ) : (
                <p>
                  Por favor, <Link className="text-blue-700" href="/iniciar-sesion">inicie sesión</Link>{' '}
                  para poder continuar con la compra
                </p>
              )}
            </Text>
          </div>
          <div className="shrink-0 font-semibold text-base md:text-lg text-brand-dark -mt-0.5 min-w-[80px] ltr:text-right rtl:text-left">
            {cartTotal}
          </div>
        </div>
        <div className="flex flex-col" onClick={closeDrawer}>
          <Link
            href={isEmpty === false && isAuthorized ? ROUTES.CHECKOUT : '/'}
            className={cn(
              'w-full px-5 py-3 md:py-4 flex items-center justify-center bg-heading rounded font-semibold text-sm sm:text-15px text-brand-light bg-brand focus:outline-none transition duration-300 hover:bg-opacity-90',
              {
                'cursor-not-allowed !text-brand-dark !text-opacity-25 !bg-opacity-25 bg-[#EEEEEE] hover:bg-[#EEEEEE]':
                  isEmpty,
              },
              {
                'cursor-not-allowed !text-brand-dark !text-opacity-25 !bg-opacity-25 bg-fill-four hover:bg-fill-four':
                  !isAuthorized,
              }
            )}
          >
            <span className="py-0.5">Pasar por la caja</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
