import Input from '@components/ui/form/input';
import Button from '@components/ui/button';
import TextArea from '@components/ui/form/text-area';
import { useForm } from 'react-hook-form';
import { useModalState } from '@components/common/modal/modal.context';
import { useModalAction } from '@components/common/modal/modal.context';
import CloseButton from '@components/ui/close-button';
import Heading from '@components/ui/heading';
import { useTranslation } from 'next-i18next';
import Cookies from 'js-cookie';
import { useState } from 'react';
import { useAddInvoiceQuery } from '@framework/invoices/add-data-invoice';
import Router from 'next/router';

interface InvoiceFormValues {
  name: string;
  user: string;
  dni: string;
  dniType: string;
  address: string;
}

const AddInvoiceForm: React.FC<any> = () => {
  const cookies = Cookies;
  const user = cookies.get('user');
  const { t } = useTranslation();
  const { data } = useModalState();

  const { closeModal } = useModalAction();
  const {
    mutateAsync: fetchPostAddress,
    isLoading,
    reset,
  } = useAddInvoiceQuery();
  const [isAdded, setIsAdded] = useState(false);
  const [isError, setIsError] = useState(false);

  function onSubmit(values: InvoiceFormValues, e: any) {
    if (values.dniType == '-1') {
      setError('dniType', {
        message: 'Tipo de documento requerido',
        type: 'manual',
      });
    }
    if (values.dniType !== '-1') {
      setIsAdded(false);
      setIsError(false);
      fetchPostAddress({ ...values })
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
        });
    }
  }

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<InvoiceFormValues>({
    defaultValues: {
      name: data || data?.name ? data?.name : '',
      user: data || data?.user ? data?.user : '',
      dni: data || data?.dni ? data?.dni : '',
      dniType: data || data?.dniType ? data?.dniType : '',
      address: data || data?.address?.address ? data?.address?.address : '',
    },
  });

  return (
    <div className="w-full md:w-[600px] lg:w-[900px] xl:w-[1000px] mx-auto p-5 sm:p-8 bg-brand-light rounded-md">
      <CloseButton onClick={closeModal} />
      <Heading variant="title" className="mb-8 -mt-1.5">
        Agregar o editar datos de facturación.
      </Heading>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="mb-6">
          <Input
            variant="solid"
            label="Nombre de la persona o razón social"
            {...register('name', { required: 'Nombre requerido' })}
            error={errors.name?.message}
          />

          <div className="mt-5">
            <label className="block font-normal text-sm leading-none mb-3 cursor-pointer">
              Tipo de documento
            </label>
            <select
              defaultValue={'-1'}
              {...register('dniType', {
                required: 'Tipo de documento requerido',
              })}
              id="countries"
              className="border border-gray-200 text-gray)-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block 
              w-full p-2.5"
            >
              <option value={'-1'} disabled>
                Selecciona tipo de documento
              </option>
              <option value="V">V-</option>
              <option value="J">J-</option>
              <option value="E">E-</option>
              <option value="G">G-</option>
            </select>
            {errors.dniType?.message ? (
              <p className="my-2 text-13px text-brand-danger text-opacity-70">
                {errors.dniType?.message}
              </p>
            ) : null}
          </div>

          <Input
            className="mt-5"
            variant="solid"
            type="number"
            label="Cedula o RIF"
            {...register('dni', { required: 'Cedula o documento requerido' })}
            error={errors.dni?.message}
          />
          <Input
            type="hidden"
            value={user}
            variant="solid"
            {...register('user', { required: 'Usuario requerido' })}
            error={errors.user?.message}
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
                Se ha agregado informacion para la facturación exitosamente.
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
          <Button
            loading={isLoading}
            className="h-11 md:h-12 mt-1.5"
            type="submit"
          >
            Guardar informacion
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddInvoiceForm;
