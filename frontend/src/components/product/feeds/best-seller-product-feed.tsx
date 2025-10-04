import ProductsCarousel from '@components/product/products-carousel';
import { useBestSellerProductsQuery } from '@framework/product/get-all-best-seller-products';
import { LIMITS } from '@framework/utils/limits';
import { ROUTES } from '@utils/routes';

export type BestSellerProductFeedType = {
  data: any;
  loading: boolean;
  isError: boolean;
};

export default function BestSellerProductFeed({
  data,
  loading,
  isError,
}: BestSellerProductFeedType) {
  return (
    <ProductsCarousel
      sectionHeading="DESTACADOS"
      products={data}
      loading={loading}
      categorySlug={`buscar`}
      error={isError ? 'Ha habido un error de conexión' : undefined}
      limit={LIMITS.BEST_SELLER_PRODUCTS_LIMITS}
      uniqueKey="best-sellers"
    />
  );
}
