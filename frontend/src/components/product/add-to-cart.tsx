import Counter from '@components/ui/counter';
import { useCart } from '@contexts/cart/cart.context';
import { generateCartItem } from '@utils/generate-cart-item';
import PlusIcon from '@components/icons/plus-icon';
import useWindowSize from '@utils/use-window-size';
import { useTranslation } from 'next-i18next';

interface Props {
  data: any;
  variation?: any;
  disabled?: boolean;
  variant?: any;
}
const AddToCart = ({
  data,
  variation,
  disabled,
  variant = 'mercury',
}: Props) => {
  const { width } = useWindowSize();
  const { t } = useTranslation('common');
  const {
    addItemToCart,
    removeItemFromCart,
    isInStock,
    getItemFromCart,
    isInCart,
  } = useCart();
  const item = generateCartItem(data!, variation);
  const handleAddClick = (
    e: React.MouseEvent<HTMLButtonElement | MouseEvent>
  ) => {
    e.stopPropagation();
    addItemToCart(item, 1);
  };
  const handleRemoveClick = (e: any) => {
    e.stopPropagation();
    removeItemFromCart(item.id);
  };
  const outOfStock = isInCart(item?.id) && !isInStock(item.id);
  const iconSize = width! > 480 ? '19' : '17';

  return !isInCart(item?.id) ? (
    variant === 'venus' ? (
      <button
        className="w-full grid grid-cols-[1fr,max-content] items-center bg-[#F4F6F8] rounded-[4px] mt-[10px] no-underline transition-all text-gray-600 hover:text-black font-medium"
        aria-label="Count Button"
        onClick={handleAddClick}
        disabled={disabled || outOfStock}
      >
        <span className="sm:flex text-[15px] sm:items-center sm:justify-center">
          Añadir al carrito
        </span>
        <span className="w-10 h-10 bg-[#E5E8EC] rounded-tr-[4px] rounded-br-[4px] flex items-center justify-center ml-auto">
          <PlusIcon width={iconSize} height={iconSize} opacity="1" />
        </span>
      </button>
    ) : (
      <button
        className="bg-[#013fb8] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-auto"
        aria-label="Count Button"
        onClick={handleAddClick}
        disabled={disabled || outOfStock}
      >
        Agregar
      </button>
    )
  ) : (
    <div>
      <p className="text-center text-brand font-bold mb-1">Agregado</p>
      <Counter
        value={getItemFromCart(item.id).quantity}
        onDecrement={handleRemoveClick}
        onIncrement={handleAddClick}
        disabled={outOfStock}
        className="w-full"
        variant={variant}
      />
    </div>
  );
};

export default AddToCart;
