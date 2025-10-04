import Link from '@components/ui/link';
import Image from 'next/image';
import cn from 'classnames';

interface BannerProps {
  banner: any;
  variant?: 'rounded' | 'default';
  effectActive?: boolean;
  className?: string;
  classNameInner?: string;
  useWidht?: number;
}

const BannerCard: React.FC<BannerProps> = ({
  banner,
  className,
  variant = 'default',
  effectActive = true,
  classNameInner,
  useWidht,
}) => {
  const {
    banners: { url, alt, width, height },
  } = banner;
  return (
    <div className={cn('mx-auto', className)}>
      <Link
        href={banner?.redirectTo ?? '/buscar'}
        className={cn(
          'h-full group flex justify-center relative overflow-hidden',
          classNameInner
        )}
      >
        <img
          src={url}
          width={useWidht ?? width}
          height={height}
          alt={alt}
          className={cn('bg-fill-thumbnail object-cover w-full', {
            'rounded-md': variant === 'rounded',
          })}
        />
        {effectActive && (
          <div className="absolute top-0 block w-1/2 h-full transform -skew-x-12 ltr:-left-full rtl:-right-full z-5 bg-gradient-to-r from-transparent to-white opacity-30 group-hover:animate-shine" />
        )}
      </Link>
    </div>
  );
};

export default BannerCard;
