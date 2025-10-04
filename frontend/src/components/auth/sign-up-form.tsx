import { useState } from 'react';
import Input from '@components/ui/form/input';
import PasswordInput from '@components/ui/form/password-input';
import Button from '@components/ui/button';
import { useForm } from 'react-hook-form';
import Logo from '@components/ui/logo';
import { useSignUpMutation, SignUpInputType } from '@framework/auth/use-signup';
import Link from '@components/ui/link';
import { useTranslation } from 'next-i18next';
import Image from '@components/ui/image';
import { useModalAction } from '@components/common/modal/modal.context';
import CloseButton from '@components/ui/close-button';
import cn from 'classnames';
import { ROUTES } from '@utils/routes';
import { LoginInputType, useLoginMutation } from '@framework/auth/use-login';
import { useRouter } from 'next/router';

interface SignUpFormProps {
  isPopup?: boolean;
  className?: string;
}

export default function SignUpForm({
  isPopup = true,
  className,
}: SignUpFormProps) {
  const { t } = useTranslation();
  const { mutateAsync: signUp, isLoading } = useSignUpMutation();
  const { closeModal, openModal } = useModalAction();
  const { mutateAsync: login, reset } = useLoginMutation();
  const [isErrorSubmit, setErrorSubmit] = useState(false);
  const [errorData, setErrorData] = useState({ status: null });
  const route = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpInputType>();
  function handleSignIn() {
    return openModal('LOGIN_VIEW');
  }

  async function onLoginSubmit({ email, password }: LoginInputType) {
    await login({
      email,
      password,
    })
      .then((r) => {
        closeModal();
        route.push('/');
      })
      .catch((e) => {
        console.log(e);
        setErrorData(e.response);
        setErrorSubmit(true);
      });
    reset();
  }

  function onSubmit({ name, email, password, phone }: SignUpInputType) {
    setErrorSubmit(false);
    signUp({
      email,
      password,
      name,
      phone,
    })
      .then((r) => {
        onLoginSubmit({ email, password });
      })
      .catch((e) => {
        console.log(e);
        setErrorData(e.response);
        setErrorSubmit(true);
      });
  }
  return (
    <div
      className={cn(
        'flex bg-brand-light mx-auto rounded-lg md:w-[720px] lg:w-[920px] xl:w-[1000px] 2xl:w-[1200px]',
        className
      )}
    >
      {isPopup === true && <CloseButton onClick={closeModal} />}
      <div className="flex w-full mx-auto overflow-hidden rounded-lg bg-brand-light">
        <div className="md:w-1/2 lg:w-[55%] xl:w-[60%] registration hidden md:block relative">
          <Image
            loader={() =>
              'https://adonai.inverloan.com/media/registration.webp'
            }
            src="https://adonai.inverloan.com/media/registration.webp"
            alt="sign up"
            layout="fill"
          />
        </div>
        <div className="w-full md:w-1/2 lg:w-[45%] xl:w-[40%] py-6 sm:py-10 px-4 sm:px-8 md:px-6 lg:px-8 xl:px-12 rounded-md shadow-dropDown flex flex-col justify-center">
          <div className="text-center mb-6 pt-2.5">
            <div onClick={closeModal}>
              <Logo />
            </div>
            <h4 className="text-xl font-semibold text-brand-dark sm:text-2xl sm:pt-3 ">
              Regístrese gratis
            </h4>
            <div className="flex flex-col mt-3 mb-1 text-sm text-center sm:text-base text-body">
              <span>Ya tengo mi cuenta </span>
              <button
                type="button"
                className="text-sm font-semibold ltr:ml-1 rtl:mr-1 sm:text-base text-brand hover:no-underline focus:outline-none"
                onClick={handleSignIn}
              >
                Iniciar sesión
              </button>
            </div>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col justify-center"
            noValidate
          >
            <div className="flex flex-col space-y-4">
              <Input
                label='Nombre'
                type="text"
                variant="solid"
                {...register('name', {
                  required: 'Nombre requerido',
                })}
                error={errors.name?.message}
              />
              <Input
                label='Teléfono'
                type="text"
                variant="solid"
                {...register('phone', {
                  required: 'Telefono requerido',
                  pattern: {
                    value:
                      /^(0412|0414|0416|0424|0426|0212|0234|0235|0238|0241|0242|0243|0244|0245|0246)\d{7}$/,
                    message: 'Teléfono incorrecto',
                  },
                })}
                error={errors.phone?.message}
              />
              <Input
                label='Correo electrónico'
                type="email"
                variant="solid"
                {...register('email', {
                  required: 'Correo requerido',
                  pattern: {
                    value:
                      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    message: 'Correo incorrecto',
                  },
                })}
                error={errors.email?.message}
              />
              <PasswordInput
                label='Contraseña'
                error={errors.password?.message}
                {...register('password', {
                  required: 'Contraseña requerida',
                })}
              />
              {isErrorSubmit && errorData?.status == 400 ? (
                <div className="relative flex flex-col items-center justify-center text-sm">
                  <span className="mt-6 text-sm text-red-600 opacity-70">
                    Este E-Mail ya esta en uso.
                  </span>
                </div>
              ) : null}
              {isErrorSubmit && errorData?.status != 400 ? (
                <div className="relative flex flex-col items-center justify-center text-sm">
                  <span className="mt-6 text-sm text-red-600 opacity-70">
                    Ha sucedido algo extraño, vuelva a intentarlo mas tarde
                  </span>
                </div>
              ) : null}
              {/*
              <div className="flex items-center justify-center">
                <div
                  className="flex ltr:ml-auto rtl:mr-auto mt-[2px]"
                  onClick={closeModal}
                >
                  <Link
                    href={ROUTES.PRIVACY}
                    className="text-sm ltr:text-right rtl:text-left text-heading ltr:pl-3 lg:rtl:pr-3 hover:no-underline hover:text-brand-dark focus:outline-none focus:text-brand-dark"
                  >
                    Política de privacidad
                  </Link>
                </div>
              </div>
              */}
              <div className="relative">
                <Button
                  type="submit"
                  loading={isLoading}
                  disabled={isLoading}
                  className="w-full mt-2 tracking-normal h-11 md:h-12 font-15px md:font-15px"
                  variant="formButton"
                >
                  Registrar cuenta
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
