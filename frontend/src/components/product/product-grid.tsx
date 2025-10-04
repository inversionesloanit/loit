import { FC, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import Alert from '@components/ui/alert';
import Button from '@components/ui/button';
import ProductCardAlpine from '@components/product/product-cards/product-card-alpine';
import ProductCardLoader from '@components/ui/loaders/product-card-loader';
import cn from 'classnames';
import { useProductsQuery } from '@framework/product/get-all-products';
import qs from 'qs';
import { useCategoriesQuery } from '@framework/category/get-category';

interface ProductGridProps {
  className?: string;
}

export const ProductGrid: FC<ProductGridProps> = ({ className = '' }) => {
  const { t } = useTranslation('common');
  const { query } = useRouter();
  const [pages, setPages] = useState({ page: 1, lastPage: 0 });
  const [products, setProducts] = useState<any>([]);

  const findCategory = (slug: any): string | undefined => {
    const categories: string[] = [];
    const structure = {
      slug: {
        in: slug?.toLowerCase(),
      },
    };
    const stringify = qs.stringify(
      { where: structure },
      { addQueryPrefix: true }
    );
    let { data } = useCategoriesQuery({ slug: stringify });
    data?.category?.docs.forEach((category: any) => {
      categories.push(category.id);
    });
    return slug ? categories.toString() : undefined;
  };

  const paginator = (lastPage: number, nextPage: number) => {
    setPages({ page: nextPage, lastPage });
    fetchNextPage();
  };

  const find = {
    title: {
      contains: query.q,
    },
    quantity: {
      greater_than: 0,
    },
    categories: {
      in: findCategory(query.category),
    },
  };
  const string = qs.stringify(
    { where: find, limit: 30, page: pages.page },
    { addQueryPrefix: true }
  );
  const {
    isFetching: isLoading,
    isFetchingNextPage: loadingMore,
    fetchNextPage,
    hasNextPage,
    data,
    error,
  } = useProductsQuery({ category: string });

  useEffect(() => {
    setProducts([]);
    setPages({
      page: 1,
      lastPage: data?.pages[0].paginatorInfo.pages.totalPages,
    });
  }, [query]);

  const filteringData = () => {
    if (data != undefined) {
      const productsData = products;
      productsData.push(...data.pages[0].data);
      const clean = productsData.filter(
        (arr: any, index: any, self: any) =>
          index === self.findIndex((t: any) => t.id == arr.id)
      );
      setProducts(clean);
    }
  };

  useMemo(() => {
    filteringData();
  }, [data?.pages[0].data]);

  if (products == undefined && products?.length > 0) {
    return (
      <>
        <p>Cargando...</p>
      </>
    );
  }

  return (
    <>
      <div
        className={cn(
          'grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6 gap-3 md:gap-4 2xl:gap-5',
          className
        )}
      >
        {error ? (
          <div className="col-span-full">
            <Alert message={error?.message} />
          </div>
        ) : isLoading && !data?.pages?.length && products == undefined ? (
          Array.from({ length: 30 }).map((_, idx) => (
            <ProductCardLoader
              key={`product--key-${idx}`}
              uniqueKey={`product--key-${idx}`}
            />
          ))
        ) : (
          products?.map((product: any) => {
            return (
              <ProductCardAlpine
                key={`product--key-${product.id}`}
                product={product}
              />
            );
          })
        )}
        {/* end of error state */}
      </div>
      {hasNextPage && (
        <div className="text-center pt-8 xl:pt-10">
          <Button
            loading={isLoading}
            disabled={loadingMore}
            onClick={() =>
              paginator(
                data?.pages[0].paginatorInfo.pages.totalPages,
                data?.pages[0].paginatorInfo.pages.nextPage
              )
            }
          >
            Cargar mas productos
          </Button>
        </div>
      )}
    </>
  );
};
