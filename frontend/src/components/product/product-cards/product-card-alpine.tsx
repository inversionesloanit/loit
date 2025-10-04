import cn from 'classnames';
import Image from '@components/ui/image';
import usePrice from '@framework/product/use-price';
import { Product } from '@framework/types';
import { useModalAction } from '@components/common/modal/modal.context';
import useWindowSize from '@utils/use-window-size';
import { Eye } from '@components/icons/eye-icon';
import { useCart } from '@contexts/cart/cart.context';
// import { AddToCart } from '@components/product/add-to-cart';
import { useTranslation } from 'next-i18next';
import { productPlaceholder } from '@assets/placeholders';
import dynamic from 'next/dynamic';
const AddToCart = dynamic(() => import('@components/product/add-to-cart'), {
  ssr: false,
});

interface ProductProps {
  product: Product;
  className?: string;
}
function RenderPopupOrAddToCart({ props }: { props: Object }) {
  let { data }: any = props;
  const { t } = useTranslation('common');
  const { id, quantity, product_type } = data ?? {};
  const { width } = useWindowSize();
  const { openModal } = useModalAction();
  const { isInCart, isInStock } = useCart();
  const iconSize = width! > 1024 ? '19' : '17';
  const outOfStock = isInCart(id) && !isInStock(id);
  function handlePopupView() {
    openModal('PRODUCT_VIEW', data);
  }
  if (Number(quantity) < 1 || outOfStock) {
    return (
      <span className="text-[11px] md:text-xs font-bold text-brand-light uppercase inline-block bg-brand-danger rounded-full px-2.5 pt-1 pb-[3px] mx-0.5 sm:mx-1">
        Sin stock
      </span>
    );
  }
  if (product_type === 'variable') {
    return (
      <button
        className="inline-flex items-center justify-center w-8 h-8 text-4xl rounded-full bg-brand lg:w-10 lg:h-10 text-brand-light focus:outline-none focus-visible:outline-none"
        aria-label="Count Button"
        onClick={handlePopupView}
      >
        <Eye width={iconSize} height={iconSize} opacity="1" />
      </button>
    );
  }
  return <AddToCart data={data} variant="mercury" />;
}
const ProductCardAlpine: React.FC<ProductProps> = ({ product, className }) => {
  const { title, images, quantity, sale_price } = product ?? {};
  const { openModal } = useModalAction();
  const { t } = useTranslation('common');
  const { price, basePrice, discount } = usePrice({
    amount: product?.price ? product?.price : product?.price,
    baseAmount: product?.price,
    currencyCode: 'USD',
  });
  const { price: minPrice } = usePrice({
    amount: product?.price ?? 0,
    currencyCode: 'USD',
  });
  const { price: maxPrice } = usePrice({
    amount: product?.price ?? 0,
    currencyCode: 'USD',
  });

  function handlePopupView() {
    openModal('PRODUCT_VIEW', product);
  }
  return (
    <article
      className={cn(
        'flex flex-col group overflow-hidden rounded-md cursor-pointer transition-all duration-300 shadow-card hover:shadow-cardHover relative h-full',
        className
      )}
      onClick={handlePopupView}
      title={title}
    >
      <div className="relative shrink-0">
        <div className="flex overflow-hidden max-w-[230px] mx-auto transition duration-200 ease-in-out transform group-hover:scale-105 relative">
          <Image
            loader={() => images[0].image.url ?? productPlaceholder}
            src={images[0].image.url ?? productPlaceholder}
            alt={title || 'Product Image'}
            width={230}
            height={280}
            quality={100}
            className="object-cover bg-fill-thumbnail"
          />
        </div>
        <div className="w-full h-full absolute top-0 pt-2.5 md:pt-3.5 px-3 md:px-4 lg:px-[18px] z-10 -mx-0.5 sm:-mx-1">
          {sale_price && (
            <span className="text-[11px] md:text-xs font-bold text-brand-light uppercase inline-block bg-brand rounded-full px-2.5 pt-1 pb-[3px] mx-0.5 sm:mx-1">
              En oferta
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-col px-3 md:px-4 lg:px-[18px] pb-5 lg:pb-6 lg:pt-1.5 h-full">
        <h2 className="text-brand-dark text-13px font-semibold sm:text-sm lg:text-15px leading-5 sm:leading-6 mb-1.5">
          {title}
        </h2>
        <div className="mb-1 lg:mb-1.5 -mx-1">
          {/*
            <span className="inline-block mx-1 text-sm font-semibold sm:text-15px lg:text-base text-brand-dark">
              {product_type === 'variable'
                ? `${minPrice} - ${maxPrice}`
                : price}
            </span>
            */}
          <span
            className={
              sale_price
                ? 'w-full items-center inline-block mx-1 text-sm text-gray-600 sm:text-15px lg:text-base text-brand-dark font-bold'
                : 'w-full items-center inline-block mx-1 text-sm text-gray-600 sm:text-15px lg:text-base text-brand-dark'
            }
          >
            {sale_price ? (
              <div className="flex items-center justify-center">
                <div className="text-brand-dark font-bold text-base md:text-xl">
                  {`$${sale_price}`}
                </div>
                <>
                  <del className="text-sm text-opacity-50 md:text-15px ltr:pl-3 rtl:pr-3 text-brand-dark ">
                    {`${price}`}
                  </del>
                </>
              </div>
            ) : (
              <div className="flex items-center w-full">
                <div className="w-full text-center text-brand-dark font-semibold text-base md:text-xl">
                  <span>{price}</span>
                </div>
              </div>
            )}
          </span>
          {basePrice && (
            <del className="mx-1 text-sm text-brand-dark text-opacity-70">
              {basePrice}
            </del>
          )}
        </div>
        {/**
         * <div className="text-13px sm:text-sm">Disponible: {quantity}</div>
         */}
        <div className="mx-auto mt-auto">
          <RenderPopupOrAddToCart props={{ data: product }} />
        </div>
      </div>
    </article>
  );
};

export default ProductCardAlpine;
