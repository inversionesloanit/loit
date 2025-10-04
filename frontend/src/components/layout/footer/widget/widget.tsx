import WidgetLink from './widget-link';
import WidgetAbout from './widget-about-us';
import WidgetSubscription from './widget-subscription';
import { footer } from '../data';
import cn from 'classnames';

interface WidgetsProps {
  variant?: 'default' | 'medium';
  widgets: {
    id: number;
    widgetTitle: string;
    lists: any;
  }[];
}
// grid grid-cols-2 md:grid-cols-7 xl:grid-cols-12 gap-5 sm:gap-9 lg:gap-11 xl:gap-7 pb-[50px]
//col-span-full sm:col-span-1 md:col-span-3 sm:border-b-0 border-border-three
const Widgets: React.FC<WidgetsProps> = ({ widgets, variant = 'default' }) => {
  const { social } = footer;
  return (
    <div
      className={`${
        variant === 'default' &&
        'mx-auto max-w-[1920px] px-4 md:px-6 lg:px-8 2xl:px-10'
      }`}
    >
      <div className="mb-4">
        <WidgetAbout
          social={social}
          className=""
        />
      </div>
    </div>
  );
};

export default Widgets;
