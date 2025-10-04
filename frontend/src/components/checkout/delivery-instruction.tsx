import TextArea from '@components/ui/form/text-area';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'next-i18next';
import Text from '@components/ui/text';
import Button from '@components/ui/button';

interface ContactFormValues {
  instructionNote: string;
  default: boolean;
}

const DeliveryInstructions: React.FC<{ data?: any; callback?: Function }> = ({
  data,
  callback,
}) => {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  function onSubmit(values: any) {
    if (callback != undefined) {
      callback(values);
    }
  }

  return (
    <div className="w-full">
      <div className="w-full mx-auto">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Tu mensaje
            </label>
            <textarea
              {...register('textarea')}
              id="message"
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Deja instrucciones para la entrega acá"
            ></textarea>
          </div>
          <div className="mb-6 hidden">
            <input
              type="checkbox"
              className="w-5 h-5 transition duration-500 ease-in-out border border-gray-300 rounded cursor-pointer form-checkbox focus:ring-offset-0 hover:border-heading focus:outline-none focus:ring-0 focus-visible:outline-none focus:checked:bg-brand hover:checked:bg-brand checked:bg-brand"
              {...register('default')}
            />
            <label
              htmlFor="default-type"
              className="font-medium align-middle ltr:ml-3 rtl:mr-3 text-brand-dark text-15px"
            >
              {t('forms:label-leave-at-my-door')}
            </label>
            <Text className="ltr:ml-8 rtl:mr-8 pt-2.5" variant="small">
              {t('common:text-selecting-this-option')}
            </Text>
          </div>
          <div className="ltr:text-right rtl:text-left">
            <button
              type="submit"
              className="bg-brand text-brand-light rounded font-semibold font-[14px] px-4 py-3"
            >
              {t('button-next-steps')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DeliveryInstructions;
