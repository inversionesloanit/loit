import Image from '@components/ui/image';

interface CopyrightProps {
  variant?: 'default' | 'medium';
  payment?: {
    id: string | number;
    path?: string;
    name: string;
    image: string;
    width: number;
    height: number;
  }[];
}
const year = new Date().getFullYear();
const Copyright: React.FC<CopyrightProps> = ({
  payment,
  variant = 'default',
}) => {
  return (
    <div className="pb-20 lg:pb-7">
      <div
        className={`${
          variant === 'default' &&
          'mx-auto max-w-[1920px] px-4 md:px-6 lg:px-8 2xl:px-10'
        }`}
      >
        <div className="flex flex-col pt-6 text-center border-t md:flex-row md:justify-between border-border-three lg:pt-7">
          {payment && (
            <ul className="flex flex-wrap justify-center items-center -mb-1.5 md:mb-0 mx-auto md:mx-0 pt-3.5 md:pt-0">
              {payment?.map((item) => (
                <li
                  className="inline-flex mb-2 transition md:mb-0 hover:opacity-80 ltr:mr-4 sm:ltr:mr-5 lg:ltr:mr-7 last:ltr:mr-0 rtl:ml-4 sm:rtl:ml-5 lg:rtl:ml-7 last:rtl:ml-0"
                  key={`payment-list--key${item.id}`}
                >
                  <a
                    href={item.path ? item.path : '/#'}
                    target="_blank"
                    className="inline-flex"
                    rel="noreferrer"
                  >
                    <Image
                      src={item.image}
                      alt={item.name}
                      height={item.height}
                      width={item.width}
                    />
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Copyright;
