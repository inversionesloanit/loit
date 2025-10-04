import { CollectionConfig, FieldHook } from "payload/types";

const formatSlug: FieldHook = async ({ value, data }) => {
  // return formatted version of title if exists, else return unmodified value
  return data?.name?.replace(/ /g, "-").toLowerCase() ?? value;
};

const Exchange: CollectionConfig = {
  slug: "exchange",
  labels: { singular: "tasa de cambio", plural: "tasas de cambio" },
  access: {
    read: ({ req: { user } }): boolean => true,
    update: ({ req: { user } }): boolean => user?.exchange?.update,
    create: ({ req: { user } }): boolean => user?.exchange?.create,
    delete: ({ req: { user } }): boolean => user?.exchange?.delete,
  },
  admin: {
    useAsTitle: "name",
  },
  fields: [
    {
      name: "name",
      label: "Fecha de tasa",
      type: "text",
      required: true,
    },
    {
      name: "price",
      label: "Tasa",
      type: "text",
      required: true,
    },
    {
      name: "is_active",
      label: "Activo?",
      type: "checkbox",
      defaultValue: true,
    },
  ],
};

export default Exchange;
