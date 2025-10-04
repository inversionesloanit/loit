import Input from '@components/ui/form/input';
import Button from '@components/ui/button';
import TextArea from '@components/ui/form/text-area';
import { useForm } from 'react-hook-form';
import { useModalState } from '@components/common/modal/modal.context';
import { useModalAction } from '@components/common/modal/modal.context';
import CloseButton from '@components/ui/close-button';
import Heading from '@components/ui/heading';
import { useTranslation } from 'next-i18next';
import { useAddAddressQuery } from '@framework/address/add-address-query';
import Cookies from 'js-cookie';
import { useState } from 'react';
import Router from 'next/router';

interface ContactFormValues {
  name: string;
  default: boolean;
  lat: number;
  usedByUsers: string;
  lng: number;
  address?: string;
}

const AddAddressForm: React.FC = () => {
  const cookies = Cookies;
  const user = cookies.get('user');
  const { t } = useTranslation();
  const { data } = useModalState();

  const { closeModal } = useModalAction();
  const {
    mutateAsync: fetchPostAddress,
    isLoading,
    reset,
  } = useAddAddressQuery();
  const [isAdded, setIsAdded] = useState(false);
  const [isError, setIsError] = useState(false);

  function onSubmit(values: ContactFormValues, e: any) {
    setIsAdded(false);
    setIsError(false);
    fetchPostAddress({ data: values, userId: user })
      .then((r) => {
        setIsAdded(true);
        setIsError(false);
        reset();
        Router.reload();
      })
      .catch((e) => {
        setIsAdded(false);
        setIsError(true);
        console.log(e);
        reset();
      });
  }

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ContactFormValues>({
    defaultValues: {
      usedByUsers: user,
      name: data || data?.name ? data?.name : '',
      default: data || data?.default ? data?.default : '',
      address: data || data?.address?.address ? data?.address?.address : '',
    },
  });

  return (
    <div className="w-full md:w-[600px] lg:w-[900px] xl:w-[1000px] mx-auto p-5 sm:p-8 bg-brand-light rounded-md">
      <CloseButton onClick={closeModal} />
      <Heading variant="title" className="mb-8 -mt-1.5">
        {t('common:text-add-delivery-address')}
      </Heading>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="mb-6">
          <Input
            variant="solid"
            label="Nombre de la direccion"
            {...register('name', { required: 'Nombre requerido' })}
            error={errors.name?.message}
          />
          <Input
            type="hidden"
            value={user}
            variant="solid"
            {...register('usedByUsers', { required: 'usuario requerido' })}
            error={errors.name?.message}
          />
        </div>
        <div className="grid grid-cols-1 mb-6 gap-7">
          <TextArea
            label="Direccion"
            {...register('address', {
              required: 'forms:address-required',
            })}
            error={errors.address?.message}
            className="text-brand-dark"
            variant="solid"
          />
        </div>
        {isAdded && !isError ? (
          <div className="relative flex mt-5 mb-1 md:mt-6 lg:mt-7 sm:mb-4 lg:mb-6">
            <div className="ltr:pr-2.5 rtl:pl-2.5">
              <Heading className="mb-1 font-medium text-green-500">
                Se ha agregado la dirección exitosamente.
              </Heading>
            </div>
          </div>
        ) : null}
        {!isAdded && isError ? (
          <div className="relative flex mt-5 mb-1 md:mt-6 lg:mt-7 sm:mb-4 lg:mb-6">
            <div className="ltr:pr-2.5 rtl:pl-2.5">
              <Heading className="mb-1 font-medium text-red-500">
                Ha habido un error, intentelo mas tarde.
              </Heading>
            </div>
          </div>
        ) : null}
        <div className="flex justify-end w-full">
          <Button className="h-11 md:h-12 mt-1.5" type="submit">
            {t('common:text-save-address')}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddAddressForm;
