import Alert from '@components/ui/alert';
import CategoryListCardLoader from '@components/ui/loaders/category-list-card-loader';
import { useFeaturedCategories } from '@framework/category/get-featured-categories';
import cn from 'classnames';
import CategoryMenu from '@components/ui/category-menu';
import qs from 'qs';

interface CategoryDropdownProps {
  className?: string;
  onClick: () => void;
}

export default function CategoryDropdownMenu({
  className,
  onClick,
}: CategoryDropdownProps) {
  const find = {
    featured: {
      equals: true,
    },
  };
  const string = qs.stringify(
    { where: find, limit: 60 },
    { addQueryPrefix: true }
  );

  const {
    data: { data },
    error,
    isLoading: loading,
  } = useFeaturedCategories(string);

  return (
    <div className={cn('absolute z-30', className)}>
      <div className="max-h-full overflow-hidden">
        {error ? (
          <div className="2xl:ltr:pr-4 2xl:rtl:pl-4">
            <Alert message={error.message} />
          </div>
        ) : loading ? (
          Array.from({ length: 15 }).map((_, idx) => (
            <CategoryListCardLoader
              key={`category-list-${idx}`}
              uniqueKey="category-list-card-loader"
            />
          ))
        ) : (
          <CategoryMenu onClick={onClick} items={data} />
        )}
      </div>
    </div>
  );
}
