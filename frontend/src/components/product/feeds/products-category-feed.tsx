import { useProductsByCategory } from '@framework/product/get-all-fresh-vegetables-products';
import ProductsCarousel from '@components/product/products-carousel';
import { LIMITS } from '@framework/utils/limits';
import { Category } from '@framework/types';
import qs from 'qs';

export default function ProductsByCategoryFeed({
  category,
}: {
  category: Category;
}) {
  const query = {
    categories: {
      in: category.id,
    },
    quantity: {
      greater_than: 0,
    },
  };
  const stringifiedQuery = qs.stringify(
    {
      where: query, // ensure that `qs` adds the `where` property, too!
    },
    { addQueryPrefix: true }
  );
  const { data, isLoading, error } = useProductsByCategory({
    query: stringifiedQuery,
  });
  return (
    <ProductsCarousel
      sectionHeading={category.name}
      categorySlug={`buscar?category=${category.slug}`}
      products={data?.docs}
      loading={isLoading}
      error={error ? 'Ha habido un error de conexión' : undefined}
      limit={LIMITS.FRESH_VEGETABLES_PRODUCTS_LIMITS}
      uniqueKey="fresh-vegetable"
    />
  );
}
