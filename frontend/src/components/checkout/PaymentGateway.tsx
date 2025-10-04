import { useEffect, useState } from 'react';
import { ReactI18NextChild } from 'react-i18next';
import { RadioGroup } from '@headlessui/react';
import { usePaymentQuery } from '@framework/payment/payment';
import { useFieldArray, useForm } from 'react-hook-form';
import Button from '@components/ui/button';
import TrashIcon from '@components/icons/trash-icon';

function PaymentGateway({
  callback,
}: {
  callback?: (data: {
    info: string;
    transactionId?: string;
    transmitter?: string;
    paymentCash?: { amount: number; currency: string }[];
  }) => void;
}) {
  const { data, isLoading }: { data: any; isLoading: boolean } =
    usePaymentQuery();
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();
  const [info, setInfo] = useState('');
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'paymentCash',
  });

  const onSelectPayment = (item: any) => {
    setInfo(item.id);
  };

  const onSubmit = (data: any) => {
    if (info.length > 0) {
      data = { ...data, info };
      if (callback != undefined) {
        callback(data);
      }
    }
  };

  useEffect(() => {
    reset();
    if (info == '660ec97f29bc6348de372017' && fields.length == 0) {
      append({ currency: -1, amount: -1 });
    }
  }, [info]);

  if (isLoading) {
    return <p>Cargando...</p>;
  }

  return (
    <div className="w-full px-4 py-16">
      <div className="mx-auto w-full">
        <form onSubmit={handleSubmit(onSubmit)}>
          <RadioGroup onChange={onSelectPayment}>
            <RadioGroup.Label className="sr-only">Server size</RadioGroup.Label>
            <div className="space-y-2 flex flex-wrap">
              {data.map((plan: any) => {
                return (
                  <RadioGroup.Option
                    key={plan.name}
                    value={plan}
                    className={({ active, checked }) =>
                      `${
                        active
                          ? 'ring-2 ring-white ring-opacity-60 ring-offset-2 ring-offset-sky-300'
                          : ''
                      }
                            ${
                              checked
                                ? 'bg-sky-900 bg-opacity-75 text-white'
                                : 'bg-white'
                            }
                              relative flex cursor-pointer border border-sky-600 rounded-lg px-5 py-4 shadow-xl mx-2 focus:outline-none w-full`
                    }
                  >
                    {({ active, checked }) => (
                      <>
                        <div className="flex w-full items-center justify-between">
                          <div className="flex items-center">
                            <div className="text-sm">
                              <RadioGroup.Label
                                as="p"
                                className={`font-medium  ${
                                  checked ? 'text-white' : 'text-gray-900'
                                }`}
                              >
                                {plan.name}
                              </RadioGroup.Label>
                              <RadioGroup.Description
                                as="span"
                                className={`inline ${
                                  checked ? 'text-sky-100' : 'text-gray-500'
                                }`}
                              >
                                <span>{plan.dataPaymentWay}</span>
                              </RadioGroup.Description>
                            </div>
                          </div>
                          {checked && (
                            <div className="shrink-0 text-white">
                              <CheckIcon className="h-6 w-6" />
                            </div>
                          )}
                        </div>
                      </>
                    )}
                  </RadioGroup.Option>
                );
              })}
            </div>
            {info.length <= 0 ? (
              <p className="text-red-500 text-md mt-8">
                Por favor seleccione un medio de pago.
              </p>
            ) : null}
          </RadioGroup>
          {info == '660ec97f29bc6348de372017' ? (
            <div className="flex flex-wrap -mx-3 mb-6 w-full mt-10">
              {fields.map((field, index) => (
                <div key={index} className="w-full my-3 md:mb-0 flex gap-2">
                  <select
                    {...register(`paymentCash.${index}.currency`, {
                      value: -1,
                      required: 'Este campo es necesario', // JS only: <p>error message</p> TS only support string
                    })}
                    id="countries"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm 
                    rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full
                     p-2.5"
                  >
                    <option disabled value={-1}>
                      Moneda
                    </option>
                    <option value="USD">Dolares ($)</option>
                    <option value="VES">Bolivares (BsD)</option>
                  </select>
                  <select
                    {...register(`paymentCash.${index}.amount`, {
                      value: -1,
                      required: 'Este campo es necesario', // JS only: <p>error message</p> TS only support string
                    })}
                    id="countries"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm 
                    rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full
                     p-2.5"
                  >
                    <option disabled value={-1}>
                      Denominación del billete
                    </option>
                    <option value={1}>1</option>
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={50}>50</option>
                    <option value={100}>100</option>
                  </select>
                  <Button
                    disabled={fields.length == 1}
                    type="button"
                    className="!bg-red-500"
                    onClick={() => remove(index)}
                  >
                    Eliminar
                  </Button>
                  {errors.transactionId && (
                    <p className="text-red-500 text-xs italic">
                      {errors?.transactionId?.message as ReactI18NextChild}
                    </p>
                  )}
                </div>
              ))}
              <Button
                type="button"
                onClick={() => append({ currency: -1, amount: -1 })}
                className="mt-3"
              >
                Agregar otro billete
              </Button>
            </div>
          ) : (
            <div className="flex flex-wrap -mx-3 mb-6 w-full mt-10">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Número de comprobante
                </label>
                <input
                  {...register('transactionId', {
                    required: 'Este campo es necesario',
                  })}
                  className="appearance-none block w-full bg-gray-50 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  id="grid-first-name"
                  type="text"
                  placeholder="Ejemplo: 1234567890"
                />
                {errors.transactionId && (
                  <p className="text-red-500 text-xs italic">
                    {errors?.transactionId?.message as ReactI18NextChild}
                  </p>
                )}
              </div>
              <div className="w-full md:w-1/2 px-3">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Nombre del banco emisor
                </label>
                <input
                  {...register('transmitter', {
                    required: 'Este campo es necesario',
                  })}
                  className="appearance-none block w-full bg-gray-50 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-last-name"
                  type="text"
                  placeholder="Ejemplo: Provincial"
                />

                {errors.transmitter && (
                  <p className="text-red-500 text-xs italic">
                    {errors?.transmitter?.message as ReactI18NextChild}
                  </p>
                )}
              </div>
            </div>
          )}
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Guardar
          </button>
        </form>
      </div>
    </div>
  );
}

function CheckIcon(props: any) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <circle cx={12} cy={12} r={12} fill="#fff" opacity="0.2" />
      <path
        d="M7 13l3 3 7-7"
        stroke="#fff"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default PaymentGateway;
