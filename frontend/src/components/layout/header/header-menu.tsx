import Link from '@components/ui/link';
import { FaChevronDown } from 'react-icons/fa';
import ListMenu from '@components/ui/list-menu';
import cn from 'classnames';
import { useFeaturedCategories } from '@framework/category/get-featured-categories';
import qs from 'qs';
import { useEffect } from 'react';

interface MenuProps {
  data: any;
  className?: string;
  textColor?: string;
}

const HeaderMenu: React.FC<MenuProps> = ({
  data: dataMenu,
  className,
  textColor,
}) => {
  const find = {
    featured: {
      equals: true,
    },
  };
  const string = qs.stringify(
    { where: find, limit: 60 },
    { addQueryPrefix: true }
  );
  const { data } = useFeaturedCategories(string);

  const parsingData = ({ data }: { data: any[] }) => {
    dataMenu[1].subMenu = [];
    data.map((item, index) => {
      dataMenu[1].subMenu.push({
        id: index,
        path: `/buscar?category=${item.slug}`,
        label: item.name,
      });
    });
  };

  useEffect(() => {
    if (data) {
      parsingData(data);
    }
  }, [data]);
  // Deleting last item (about-loan)
  return (
    <nav className={cn('headerMenu relative -mx-3 xl:-mx-4', className)}>
      {dataMenu?.map((item: any) => (
        <div
          className="relative py-3 mx-3 cursor-pointer menuItem group xl:mx-4"
          key={item.id}
        >
          <Link
            href={item.path}
            className={`${
              textColor ? textColor : 'text-dark'
            } relative w-max font-semibold group-hover:text-gray-300 inline-flex items-center py-2 text-sm font-normal lg:text-15px before:absolute 
            before:ltr:right-0 rtl:left-0 before:bg-gray-300 before:h-[3px] before:transition-all before:duration-300 before:-bottom-[14px] group-hover:before:w-full 
            ltr:group-hover:before:left-0 rtl:group-hover:before:right-0 lrt:group-hover:before:right-auto rtl:group-hover:before:left-auto"`}
          >
            {item.label}
            {/**
               * 
            {(item?.columns || item.subMenu) && (
              <span className="text-xs mt-1 xl:mt-0.5 flex justify-end text-brand-dark opacity-40 group-hover:text-brand">
                <FaChevronDown className="transition duration-300 ease-in-out transform group-hover:-rotate-180" />
              </span>
            )}
               */}
          </Link>

          {/**
   * 
          {item?.subMenu && Array.isArray(item?.subMenu) && (
            <div className="absolute z-30 opacity-0 subMenu shadow-dropDown transition-all duration-300 invisible bg-brand-light ltr:left-0 rtl:right-0 w-full xl:w-full group-hover:opacity-100">
              <ul className="py-5 text-sm text-brand-muted">
                {item.subMenu.map((menu: any, index: number) => {
                  const dept: number = 1;
                  const menuName: string = `sidebar-menu-${dept}-${index}`;
                  return (
                    <ListMenu
                      dept={dept}
                      data={menu}
                      hasSubMenu={menu.subMenu}
                      menuName={menuName}
                      key={menuName}
                      menuIndex={index}
                    />
                  );
                })}
              </ul>
            </div>
          )}
   */}
        </div>
      ))}
    </nav>
  );
};

export default HeaderMenu;
