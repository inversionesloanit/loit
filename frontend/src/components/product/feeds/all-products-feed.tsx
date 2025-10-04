import { Fragment } from 'react';
import ProductCardAlpine from '@components/product/product-cards/product-card-alpine';
import type { FC } from 'react';
import ProductCardLoader from '@components/ui/loaders/product-card-loader';
import SectionHeader from '@components/common/section-header';
import { useModalAction } from '@components/common/modal/modal.context';
import Alert from '@components/ui/alert';
import cn from 'classnames';
import { useTranslation } from 'next-i18next';
import { LIMITS } from '@framework/utils/limits';
interface ProductFeedProps {
  element?: any;
  className?: string;
  products?: any;
}
const AllProductFeed: FC<ProductFeedProps> = ({
  products,
  element,
  className = '',
}) => {
  const { t } = useTranslation('common');

  let {
    isFetching: isLoading,
    isFetchingNextPage: loadingMore,
    fetchNextPage,
    hasNextPage,
    data,
    error,
  } = products;

  const { openModal } = useModalAction();

  function handleCategoryPopup() {
    openModal('CATEGORY_VIEW');
  }

  return (
    <div className={cn(className)}>
      <div className="flex items-center justify-between pb-0.5 mb-4 lg:mb-5 xl:mb-6">
        <SectionHeader sectionHeading="Productos destacados" className="mb-0" />
        <div
          className="lg:hidden transition-all text-brand -mt-1.5 font-semibold text-sm md:text-15px hover:text-brand-dark"
          role="button"
          onClick={handleCategoryPopup}
        >
          {t('text-categories')}
        </div>
      </div>
      {error ? (
        <Alert message={error?.message} />
      ) : (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6 md:gap-4 2xl:gap-5">
          {isLoading && !data?.pages?.length ? (
            Array.from({ length: LIMITS.PRODUCTS_LIMITS }).map((_, idx) => (
              <ProductCardLoader
                key={`product--key-${idx}`}
                uniqueKey={`product--key-${idx}`}
              />
            ))
          ) : (
            <>
              {data?.pages[0]?.data.map((product: any) => {
                return (
                  <Fragment key={`product--key${product.id}`}>
                    <ProductCardAlpine product={product} />
                  </Fragment>
                );
              })}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default AllProductFeed;
