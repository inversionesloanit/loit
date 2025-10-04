import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import Text from '@components/ui/text';
import Image from '@components/ui/image';
import Heading from '@components/ui/heading';
import Link from '@components/ui/link';

interface Props {
  image?: HTMLImageElement;
}

const ContactSupport: FC<Props> = () => {
  const { t } = useTranslation('common');
  return (
    <div className="mb-0 3xl:ltr:pr-5 3xl:rtl:pl-5">
      <Heading variant="heading" className="mb-3 lg:mb-4 xl:mb-5">
        {t('contact-form-info-title')}
      </Heading>
      <Text className="xl:leading-8">{t('contact-form-info-content')}</Text>
      <div className="flex mt-5 -mx-1"></div>
    </div>
  );
};

export default ContactSupport;
