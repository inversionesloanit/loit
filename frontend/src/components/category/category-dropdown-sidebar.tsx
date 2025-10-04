import Scrollbar from '@components/ui/scrollbar';
import SidebarMenu from '@components/ui/sidebar-menu';
import cn from 'classnames';

interface CategorySidebarProps {
  className?: string;
  categories?: any;
}

export default function CategoryDropdownSidebar({
  className,
  categories,
}: CategorySidebarProps) {
  return (
    <aside className={cn('category-mobile-sidebar', className)}>
      <div className="max-h-full overflow-hidden border rounded border-border-base">
        {categories?.pages?.data?.relatedCategories && (
          <Scrollbar className="w-full h-full category-scrollbar">
            <SidebarMenu items={categories?.pages?.data?.relatedCategories} />
          </Scrollbar>
        )}
      </div>
    </aside>
  );
}
