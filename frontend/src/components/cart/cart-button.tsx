import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { useCart } from '@contexts/cart/cart.context';
import { useUI } from '@contexts/ui.context';
import { useTranslation } from 'next-i18next';
import cn from 'classnames';

type CartButtonProps = {
  className?: string;
  iconClassName?: string;
  hideLabel?: boolean;
  isShowing?: boolean;
};

const CartButton: React.FC<CartButtonProps> = ({
  className,
  iconClassName = 'text-brand-light text-opacity-100',
  hideLabel,
  isShowing,
}) => {
  const { t } = useTranslation('common');
  const { openDrawer, setDrawerView } = useUI();
  const { totalItems } = useCart();
  function handleCartOpen() {
    setDrawerView('CART_SIDEBAR');
    isShowing;
    return openDrawer();
  }

  return (
    <button
      className={cn(
        'flex items-center justify-center shrink-0 h-auto focus:outline-none transform',
        className
      )}
      onClick={handleCartOpen}
      aria-label="cart-button"
    >
      <div className="relative flex items-center">
        <FontAwesomeIcon
          icon={faShoppingCart}
          size="2xl"
          className="cursor-pointer text-gray-300"
          height={22}
          width={22}
        />
        <span className="min-w-[20px] min-h-[20px] p-0.5 rounded-[20px] flex items-center justify-center bg-white text-brand-dark absolute -top-2.5 ltr:left-2.5 rtl:right-2.5 text-10px font-bold">
          {totalItems}
        </span>
      </div>
      {!hideLabel && (
        <span className="text-sm font-normal lg:text-15px text-brand-light ltr:ml-2 rtl:mr-2">
          Carrito
        </span>
      )}
    </button>
  );
};

export default CartButton;
