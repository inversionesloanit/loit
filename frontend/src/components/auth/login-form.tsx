import Input from '@components/ui/form/input';
import PasswordInput from '@components/ui/form/password-input';
import Button from '@components/ui/button';
import { useForm } from 'react-hook-form';
import { useLoginMutation, LoginInputType } from '@framework/auth/use-login';
import Logo from '@components/ui/logo';
import { useTranslation } from 'next-i18next';
import Image from '@components/ui/image';
import { useModalAction } from '@components/common/modal/modal.context';
import CloseButton from '@components/ui/close-button';
import { FaFacebook, FaTwitter, FaLinkedinIn } from 'react-icons/fa';
import cn from 'classnames';
import { useRouter } from 'next/router';
import { useState } from 'react';

interface LoginFormProps {
  isPopup?: boolean;
  className?: string;
}

const LoginForm: React.FC<LoginFormProps> = ({ isPopup = true, className }) => {
  const { t } = useTranslation();
  const { closeModal, openModal } = useModalAction();
  const { mutateAsync: login, isLoading, reset } = useLoginMutation();
  const [isErrorSubmit, setErrorSubmit] = useState(false);
  const [errorData, setErrorData] = useState({ status: null });
  const route = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInputType>();

  async function onSubmit({ email, password }: LoginInputType) {
    setErrorSubmit(false);
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
  function handleSignUp() {
    return openModal('SIGN_UP_VIEW');
  }
  function handleForgetPassword() {
    return openModal('FORGET_PASSWORD');
  }
  return (
    <div
      className={cn(
        'w-full md:w-[720px] lg:w-[920px] xl:w-[1000px] 2xl:w-[1200px] relative',
        className
      )}
    >
      {isPopup === true && <CloseButton onClick={closeModal} />}

      <div className="flex mx-auto overflow-hidden rounded-lg bg-brand-light">
        <div className="md:w-1/2 lg:w-[55%] xl:w-[60%] registration hidden md:block relative">
          <Image
            loader={() => 'http://148.113.136.150/media/login.webp'}
            src="http://148.113.136.150/media/login.webp"
            alt="signin Image"
            layout="fill"
          />
        </div>
        <div className="w-full md:w-1/2 lg:w-[45%] xl:w-[40%] py-6 sm:py-10 px-4 sm:px-8 md:px-6 lg:px-8 xl:px-12 rounded-md flex flex-col justify-center">
          <div className="mb-6 text-center">
            <div onClick={closeModal}>
              <Logo />
            </div>
            <h4 className="text-xl font-semibold text-brand-dark sm:text-2xl sm:pt-3 ">
              ¡Bienvenido de regreso!
            </h4>
            <div className="flex flex-col mt-3 mb-1 text-sm text-center sm:text-15px text-body">
              <span>¿No tiene una cuenta?</span>
              <button
                type="button"
                className="text-sm font-semibold text-brand sm:text-15px ltr:ml-1 rtl:mr-1 hover:no-underline focus:outline-none"
                onClick={handleSignUp}
              >
                Crear cuenta
              </button>
            </div>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col justify-center"
            noValidate
          >
            <div className="flex flex-col space-y-3.5">
              <Input
                label="Correo electrónico"
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
                label="Contraseña"
                error={errors.password?.message}
                {...register('password', {
                  required: 'Contraseña requerida',
                })}
              />
              <div className="flex items-center justify-center">
                <div className="flex ltr:ml-auto rtl:mr-auto mt-[3px]">
                  <button
                    type="button"
                    onClick={handleForgetPassword}
                    className="text-sm ltr:text-right rtl:text-left text-heading ltr:pl-3 lg:rtl:pr-3 hover:no-underline hover:text-brand-dark focus:outline-none focus:text-brand-dark"
                  >
                    Contraseña olvidada
                  </button>
                </div>
              </div>
              <div className="relative">
                <Button
                  type="submit"
                  loading={isLoading}
                  disabled={isLoading}
                  className="w-full mt-2 tracking-normal h-11 md:h-12 font-15px md:font-15px"
                  variant="formButton"
                >
                  Iniciar sesión
                </Button>
              </div>
            </div>
          </form>
          {isErrorSubmit && errorData?.status == 401 ? (
            <div className="relative flex flex-col items-center justify-center text-sm">
              <span className="mt-6 text-sm text-red-600 opacity-70">
                Contraseña o email incorrecto
              </span>
            </div>
          ) : null}
          {isErrorSubmit && errorData?.status != 401 ? (
            <div className="relative flex flex-col items-center justify-center text-sm">
              <span className="mt-6 text-sm text-red-600 opacity-70">
                Ha sucedido algo extraño, vuelva a intentarlo mas tarde
              </span>
            </div>
          ) : null}
          {/* 
          <div className="relative flex flex-col items-center justify-center text-sm">
            <span className="mt-6 text-sm text-brand-dark opacity-70">
              {t('common:text-or')}
            </span>
          </div>
          <div className="flex justify-center mt-5 space-x-2.5">
            <button
              className="flex items-center justify-center w-10 h-10 transition-all border rounded-full cursor-pointer group border-border-one hover:border-brand   focus:outline-none"
              onClick={handelSocialLogin}
            >
              <FaFacebook className="w-4 h-4 text-opacity-50 transition-all text-brand-dark group-hover:text-brand " />
            </button>
            <button
              className="flex items-center justify-center w-10 h-10 transition-all border rounded-full cursor-pointer group border-border-one hover:border-brand   focus:outline-none"
              onClick={handelSocialLogin}
            >
              <FaTwitter className="w-4 h-4 text-opacity-50 transition-all text-brand-dark group-hover:text-brand" />
            </button>
            <button
              className="flex items-center justify-center w-10 h-10 transition-all border rounded-full cursor-pointer group border-border-one hover:border-brand   focus:outline-none"
              onClick={handelSocialLogin}
            >
              <FaLinkedinIn className="w-4 h-4 text-opacity-50 transition-all text-brand-dark group-hover:text-brand" />
            </button>
          </div>
                
                */}
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
