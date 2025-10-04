import { CollectionConfig, FieldHook } from "payload/types";

const formatSlug: FieldHook = async ({ value, data }) => {
  // return formatted version of title if exists, else return unmodified value
  return data?.name?.replace(/ /g, "-").toLowerCase() ?? value;
};

const Categories: CollectionConfig = {
  slug: "categorias",
  access: {
    read: (): boolean => true, // Everyone can read Media
    update: ({ req: { user } }): boolean => user?.categories?.update,
    create: ({ req: { user } }): boolean => user?.categories?.create,
    delete: ({ req: { user } }): boolean => user?.categories?.delete,
  },
  admin: {
    useAsTitle: "name",
  },
  fields: [
    {
      name: "name",
      label: "Nombre de la categoria",
      type: "text",
      required: true,
    },
    {
      name: "slug",
      type: "text",
      unique: true,
      hooks: {
        beforeChange: [formatSlug],
      },
      admin: {
        readOnly: true,
      },
    },
    {
      name: "featured",
      label: "Es destacada en la barra de navegación?",
      type: "checkbox",
      defaultValue: false,
    },
    {
      type: "relationship",
      relationTo: "categorias",
      name: "children",
      label: "Subcategorias",
      hasMany: true,
    },
    {
      name: "icon",
      label: "Icono de la categoria",
      type: "upload",
      relationTo: "media",
      required: false,
    },
  ],
};

export default Categories;
