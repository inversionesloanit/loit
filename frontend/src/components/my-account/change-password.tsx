import PasswordInput from '@components/ui/form/password-input';
import Button from '@components/ui/button';
import Heading from '@components/ui/heading';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'next-i18next';
import { useResetPasswordMutation } from '@framework/customer/use-reset-password';
import { useRouter } from 'next/router';

const defaultValues = {
  password: '',
  token: '',
  newPassVerified: '',
};

const ChangePassword: React.FC = () => {
  const { t } = useTranslation();
  const {
    mutateAsync: changePassword,
    isLoading,
    error,
    isSuccess,
  } = useResetPasswordMutation();
  const router = useRouter();

  const { token } = router.query;

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues,
  });
  async function onSubmit(input: any) {
    input.token = token;
    await changePassword(input);
  }
  return (
    <>
      <Heading variant="titleLarge">
        {t('common:text-account-details-password')}
      </Heading>
      <div className="w-full flex  h-full lg:w-10/12 2xl:w-9/12 flex-col mt-6 lg:mt-7">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full mx-auto flex flex-col justify-center "
        >
          <div className="flex flex-col space-y-5 lg:space-y-7">
            <PasswordInput
              label={t('forms:label-old-password')}
              error={errors.password?.message}
              {...register('password', {
                required: `Error en este campo, verifique lo que ingreso`,
              })}
            />
            <PasswordInput
              label={t('forms:label-new-password')}
              error={errors.newPassVerified?.message}
              {...register('newPassVerified', {
                required: `Error en este campo, verifique lo que ingreso`,
              })}
            />

            <div className="relative mt-3">
              <Button
                type="submit"
                loading={isLoading}
                disabled={
                  isLoading || watch('newPassVerified') !== watch('password')
                }
                variant="formButton"
                className="w-full sm:w-auto"
              >
                {t('common:text-change-password')}
              </Button>
            </div>
            {isSuccess && (
              <span>Se ha actualizado la contraseña conrrectamente</span>
            )}
          </div>
        </form>
      </div>
    </>
  );
};

export default ChangePassword;
