import { CollectionConfig, FieldHook } from "payload/types";

const formatSlug: FieldHook = async ({ value, data }) => {
  // return formatted version of title if exists, else return unmodified value
  return data?.title?.replace(/ /g, "-").toLowerCase() ?? value;
};

const Tags: CollectionConfig = {
  slug: "etiquetas",
  access: {
    read: (): boolean => true, // Everyone can read Media
    update: ({ req: { user } }): any => user?.tags?.update,
    create: ({ req: { user } }): any => user?.tags?.create,
    delete: ({ req: { user } }): any => user?.tags?.delete,
  },
  admin: {
    useAsTitle: "title",
  },
  fields: [
    {
      name: "title",
      label: "Nombre de la etiqueta",
      type: "text",
      required: true,
    },
    {
      name: "slug",
      type: "text",
      hooks: {
        beforeChange: [formatSlug],
      },
      unique: true,
      admin: {
        readOnly: true,
      },
    },
  ],
};

export default Tags;
