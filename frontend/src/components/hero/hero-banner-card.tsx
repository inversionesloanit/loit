import cn from 'classnames';
import Link from '@components/ui/link';
import useWindowSize from '@utils/use-window-size';
import HeroSearchBox from '@components/hero/hero-banner-search';
import { useTranslation } from 'next-i18next';

interface BannerProps {
  banner?: any;
  className?: string;
  variant?: 'default' | 'slider' | 'medium' | 'antique';
}

function getImage(deviceWidth: number, imgObj: any) {
  return deviceWidth < 480 ? imgObj.mobile : imgObj.desktop;
}

export default function HeroBannerCard({
  banner,
  className = '',
  variant = 'default',
}: BannerProps) {
  const { t } = useTranslation('common');
  const { width } = useWindowSize();
  const {
    banners: { url },
  } = banner;
  if (width && width >= 1080)
    return (
      <div
        className={cn(
          'w-full bg-no-repeat object-fill bg-center flex items-center',
          {
            'bg-fill-thumbnail': variant !== 'antique',
          },
          className
        )}
        style={{
          padding: 200,
          backgroundColor: 'white',
          backgroundImage: `url('${url}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'bottom',
        }}
      ></div>
    );
}
