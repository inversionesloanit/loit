import Input from '@components/ui/form/input';
import PasswordInput from '@components/ui/form/password-input';
import Button from '@components/ui/button';
import Heading from '@components/ui/heading';
import { useForm, Controller } from 'react-hook-form';
import {
  useUpdateUserMutation,
  UpdateUserType,
} from '@framework/customer/use-update-customer';
import { useTranslation } from 'next-i18next';
import Switch from '@components/ui/switch';
import Text from '@components/ui/text';
import { useEffect, useState } from 'react';
import { useGetUser } from '@framework/auth/use-get-user';

const AccountDetails: React.FC = () => {
  const { mutateAsync: updateUser, isLoading } = useUpdateUserMutation();
  const { isLoading: userLoading, data } = useGetUser();
  const { t } = useTranslation();
  const [success, setSuccess] = useState<Boolean>(false);
  const [error, setError] = useState<Boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    getValues,
  } = useForm<UpdateUserType>({
    defaultValues: {
      name: data?.data?.user?.name,
      password: '',
      confirmPassword: '',
      email: data?.data?.user?.email,
      phone: data?.data?.user?.phone,
    },
  });
  function onSubmit(input: UpdateUserType) {
    setSuccess(false);
    setError(false);
    updateUser(input)
      .then((e) => setSuccess(true))
      .catch((e) => setError(true));
  }
  return (
    <div className="flex flex-col w-full">
      <Heading variant="titleLarge" className="mb-5 md:mb-6 lg:mb-7 lg:-mt-1">
        {t('common:text-account-details-personal')}
      </Heading>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col justify-center w-full mx-auto"
        noValidate
      >
        <div className="border-b border-border-base pb-7 md:pb-8 lg:pb-10">
          <div className="flex flex-col space-y-4 sm:space-y-5">
            <div className="flex flex-col sm:flex-row -mx-1.5 md:-mx-2.5 space-y-4 sm:space-y-0">
              <Input
                label="Nombre completo"
                defaultValue={data?.data?.user?.name ?? ''}
                {...register('name', {
                  required: 'forms:last-name-required',
                })}
                variant="solid"
                className="w-full sm:w-1/2 px-1.5 md:px-2.5"
                error={errors.name?.message}
              />
            </div>
          </div>
        </div>
        <Heading
          variant="titleLarge"
          className="pt-6 mb-5 xl:mb-8 md:pt-7 lg:pt-8"
        >
          {t('common:text-account-details-account')}
        </Heading>
        <div className="border-b border-border-base pb-7 md:pb-9 lg:pb-10">
          <div className="flex flex-col space-y-4 sm:space-y-5">
            <div className="flex flex-col sm:flex-row -mx-1.5 md:-mx-2.5 space-y-4 sm:space-y-0">
              <Input
                type="email"
                label={t('forms:label-email-star')}
                defaultValue={data?.data?.user?.email ?? ''}
                {...register('email', {
                  required: 'forms:email-required',
                  pattern: {
                    value:
                      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    message: 'forms:email-error',
                  },
                })}
                variant="solid"
                className="w-full sm:w-1/2 px-1.5 md:px-2.5"
                error={errors.email?.message}
              />
              <Input
                type="text"
                label="Telefono"
                defaultValue={data?.data?.user?.phone ?? ''}
                {...register('phone', {
                  required: 'forms:phone-required',
                  pattern: {
                    value:
                      /^(0412|0414|0416|0424|0426|0212|0234|0235|0238|0241|0242|0243|0244|0245|0246)\d{7}$/,
                    message: t('forms:phone-error'),
                  },
                })}
                variant="solid"
                className="w-full sm:w-1/2 px-1.5 md:px-2.5"
                error={errors.phone?.message}
              />
            </div>
            <div className="flex flex-col sm:flex-row -mx-1.5 md:-mx-2.5 space-y-4 sm:space-y-0">
              <PasswordInput
                label={t('forms:label-password')}
                {...register('password', {
                  required: 'forms:password-required',
                })}
                className="w-full sm:w-1/2 px-1.5 md:px-2.5"
                error={errors.password?.message}
              />
              <PasswordInput
                label={t('forms:label-confirm-password')}
                {...register('confirmPassword', {
                  required: 'forms:password-required',
                })}
                error={errors.confirmPassword?.message}
                className="w-full sm:w-1/2 px-1.5 md:px-2.5"
              />
            </div>
            {success && !error ? (
              <div className="relative flex mt-5 mb-1 md:mt-6 lg:mt-7 sm:mb-4 lg:mb-6">
                <div className="ltr:pr-2.5 rtl:pl-2.5">
                  <Heading className="mb-1 font-medium text-green-500">
                    Se ha actualizado exitosamente.
                  </Heading>
                </div>
              </div>
            ) : null}
            {!success && error ? (
              <div className="relative flex mt-5 mb-1 md:mt-6 lg:mt-7 sm:mb-4 lg:mb-6">
                <div className="ltr:pr-2.5 rtl:pl-2.5">
                  <Heading className="mb-1 font-medium text-red-500">
                    Ha habido un error, intentelo mas tarde.
                  </Heading>
                </div>
              </div>
            ) : null}
          </div>
        </div>
        <div className="relative flex pt-6 md:pt-8 lg:pt-10">
          <div className="ltr:pr-2.5 rtl:pl-2.5">
            <Heading className="mb-1 font-medium">
              {t('common:text-share-profile-data')}
            </Heading>
            <Text variant="small">
              {t('common:text-share-profile-data-description')}
            </Text>
          </div>
        </div>
        <div className="relative flex mt-5 mb-1 md:mt-6 lg:mt-7 sm:mb-4 lg:mb-6">
          <div className="ltr:pr-2.5 rtl:pl-2.5">
            <Heading className="mb-1 font-medium">
              {t('common:text-ads-performance')}
            </Heading>
            <Text variant="small">
              {t('common:text-ads-performance-description')}
            </Text>
          </div>
        </div>
        <div className="relative flex pb-2 mt-5 sm:ltr:ml-auto sm:rtl:mr-auto lg:pb-0">
          <Button
            type="submit"
            loading={isLoading}
            disabled={isLoading}
            variant="formButton"
            className="w-full sm:w-auto"
          >
            {t('common:button-save-changes')}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AccountDetails;
