import { CollectionConfig, FieldHook } from "payload/types";

const formatSlug: FieldHook = async ({ value, data }) => {
  // return formatted version of title if exists, else return unmodified value
  return data?.name?.replace(/ /g, "-").toLowerCase() ?? value;
};

const paymentsGateway: CollectionConfig = {
  slug: "paymentsGateway",
  labels: { singular: "Medio de pago", plural: "Medios de pago" },
  access: {
    read: (): boolean => true, // Everyone can read Media
    update: ({ req: { user } }): boolean => user?.payments?.update,
    create: ({ req: { user } }): boolean => user?.payments?.create,
    delete: ({ req: { user } }): boolean => user?.payments?.delete,
  },
  admin: {
    useAsTitle: "name",
  },
  fields: [
    {
      name: "name",
      label: "Nombre",
      type: "text",
      required: true,
    },
    {
      name: "dataPaymentWay",
      label: "Informacion del medio de pago",
      type: "textarea",
      required: true,
    },
  ],
};

export default paymentsGateway;
