import ProductsCarousel from '@components/product/products-carousel';
import { useProductQuery } from '@framework/product/get-product';
import { Product } from '@framework/types';

interface RelatedProductsProps {
  carouselBreakpoint?: {} | any;
  className?: string;
  uniqueKey?: string;
  relatedProducts?: Product[];
  slug: string;
}

const RelatedProductFeed: React.FC<RelatedProductsProps> = ({
  carouselBreakpoint,
  className,
  uniqueKey = 'related-product-popup',
  relatedProducts,
  slug,
}) => {
  const { data, isLoading } = useProductQuery(slug as string);
  return (
    <ProductsCarousel
      sectionHeading="Productos relacionados:"
      className={className}
      products={data?.relatedProduct}
      loading={isLoading}
      uniqueKey={uniqueKey}
      carouselBreakpoint={carouselBreakpoint}
    />
  );
};

export default RelatedProductFeed;
