import { CollectionConfig } from "payload/types";

const Invoices: CollectionConfig = {
  slug: "invoices",
  labels: { singular: "Dato de facturacion", plural: "Datos de facturacion" },
  access: {
    read: ({ req: { user } }): boolean => {
      return user?.invoices?.read;
    }, // Everyone can read Media
    update: ({ req: { user } }): boolean => user?.invoices?.update,
    create: ({ req: { user } }): boolean => user?.invoices?.create,
    delete: ({ req: { user } }): boolean => user?.invoices?.delete,
  },
  admin: {
    useAsTitle: "name",
  },
  fields: [
    {
      name: "name",
      label: "Nombre de la razon social",
      type: "text",
      required: true,
    },
    {
      name: "dni",
      label: "Documento",
      type: "text",
      required: true,
    },
    {
      name: "is_active",
      label: "Activo",
      type: "checkbox",
      defaultValue: true,
    },
    {
      name: "dniType",
      label: "Tipo de documento",
      type: "select",
      options: [
        {
          label: "Cedula",
          value: "V",
        },
        {
          label: "RIF",
          value: "J",
        },
        {
          label: "Extranjero",
          value: "E",
        },
        {
          label: "Gobierno",
          value: "G",
        },
      ],
    },
    {
      name: "user",
      label: "Usuario",
      type: "relationship",
      relationTo: "users",
      hasMany: false,
      required: true,
      admin: { position: "sidebar" },
    },
  ],
};

export default Invoices;
