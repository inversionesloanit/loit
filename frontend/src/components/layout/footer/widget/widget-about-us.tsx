import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import Logo from '@components/ui/logo';
import Text from '@components/ui/text';
import Image from '@components/ui/image';
import { ROUTES } from '@utils/routes';

interface AboutProps {
  className?: string;
  social?: {
    id: string | number;
    path?: string;
    name: string;
    image: string;
    width: number;
    height: number;
  }[];
}
const WidgetAbout: React.FC<AboutProps> = ({ social, className }) => {
  return (
    <div className={`pb-10 sm:pb-0 flex justify-between`}>
      <div className="flex">
        <span className="text-xl text-blue-700 font-bold">Siguenos </span>
        {social && (
          <ul className="flex flex-wrap justify-center mx-10 sm:justify-start">
            {social?.map((item) => (
              <li
                className="transition hover:opacity-80 last:ltr:mr-0 md:ltr:mr-5 md:mx-0 ltr:mr-4 last:rtl:ml-0 rtl:ml-4 md:rtl:ml-5"
                key={`social-list--key${item.id}`}
              >
                <Link href={item.path ? item.path : '/#'}>
                  <a target="_blank" rel="noreferrer">
                    <Image
                      src={item.image}
                      alt={item.name}
                      height={item.height}
                      width={item.width}
                      className="transform scale-85 md:scale-100"
                    />
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
      <Text>
        © Copyright 2023 Desarrollado por{' '}
        <a className="text-blue-700" href="http://glusolucionestecnologicas.com/">GLU & M</a> -
        Inversiones Loan 1904, C.A. todos los derechos reservados 2023
      </Text>
    </div>
  );
};

export default WidgetAbout;
