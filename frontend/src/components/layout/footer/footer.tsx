import Widgets from '@components/layout/footer/widget/widget';
import Copyright from '@components/layout/footer/copyright';
import { footer } from './data';
import { useWindowSize } from 'react-use';
const { widgets, payment } = footer;

interface FooterProps {
  variant?: 'default' | 'medium';
}

const Footer: React.FC<FooterProps> = ({ variant = 'default' }) => {
  return (
    <footer className="mt-[50px] lg:mt-14 2xl:mt-16 sm:flex 2xl:block xl:block lg:block md:block xl:block 2xl:block hidden sm:hidden">
      <Widgets widgets={widgets} variant={variant} />
      <div>
        <Copyright payment={payment} variant={variant} />
      </div>
    </footer>
  );
};

export default Footer;
