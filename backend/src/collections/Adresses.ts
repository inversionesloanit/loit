import { CollectionConfig, FieldHook } from "payload/types";

const formatSlug: FieldHook = async ({ value, data }) => {
  // return formatted version of title if exists, else return unmodified value
  return data?.name?.replace(/ /g, "-").toLowerCase() ?? value;
};

const Addresses: CollectionConfig = {
  slug: "addresses",
  labels: { singular: "dirección", plural: "direcciones" },
  access: {
    read: ({ req: { user } }): boolean => user?.addresses?.read,
    update: ({ req: { user } }): boolean => user?.addresses?.update,
    create: ({ req: { user } }): boolean => user?.addresses?.create,
    delete: ({ req: { user } }): boolean => user?.addresses?.delete,
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
      name: "address",
      label: "Direccion",
      type: "textarea",
      required: true,
    },
    {
      name: "is_active",
      label: "Activo",
      type: "checkbox",
      defaultValue: true,
    },
    {
      name: "usedByUsers",
      label: "Usuario",
      type: "relationship",
      relationTo: "users",
      hasMany: false,
    },
  ],
};

export default Addresses;
