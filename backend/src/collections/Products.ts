import { CollectionConfig, FieldHook } from "payload/types";

const formatSlug: FieldHook = async ({ value, data }) => {
  // return formatted version of title if exists, else return unmodified value
  return data?.title?.replace(/[#_/. ]/g, "-").toLowerCase() ?? value;
};

// Example Collection - For reference only, this must be added to payload.config.ts to be used.
const Examples: CollectionConfig = {
  slug: "productos",
  access: {
    read: (): boolean => true, // Everyone can read Media
    update: ({ req: { user } }): boolean => user?.products?.update,
    create: ({ req: { user } }): boolean => user?.products?.create,
    delete: ({ req: { user } }): boolean => user?.products?.delete,
  },
  admin: {
    useAsTitle: "title",
  },
  fields: [
    {
      name: "title",
      label: "Titulo del producto",
      type: "text",
      required: true,
    },
    {
      name: "featured",
      label: "Producto destacado",
      type: "checkbox",
      required: false,
    },
    {
      name: "sku",
      label: "SKU",
      type: "text",
      required: true,
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "code",
      label: "Codigo interno",
      type: "text",
      required: true,
      admin: {
        position: "sidebar",
      },
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
      name: "descripcion",
      label: "Descripción",
      type: "textarea",
      required: true,
    },
    {
      name: "tax",
      label: "Impuesto",
      type: "number",
      defaultValue: 16,
      required: false,
    },
    {
      name: "price",
      label: "Precio",
      type: "number",
      required: true,
    },
    {
      name: "sale_price",
      label: "Precio en oferta",
      type: "number",
      required: false,
    },
    {
      name: "quantity",
      label: "Inventario disponible",
      type: "number",
      required: true,
      defaultValue: 1,
    },
    {
      name: "unit",
      label: "Venta por unidades",
      type: "number",
      required: true,
      defaultValue: 1,
    },
    {
      name: "categories",
      label: "Categorias",
      type: "relationship",
      relationTo: "categorias",
      hasMany: true,
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "tags",
      label: "Etiquetas",
      type: "relationship",
      relationTo: "etiquetas",
      hasMany: true,
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "status",
      label: "Estado de la orden",
      type: "relationship",
      relationTo: "status-orders",
      hasMany: false,
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "images",
      label: "Imagenes",
      type: "array",
      required: false,
      maxRows: 6,
      minRows: 0,
      fields: [
        {
          name: "image",
          label: "imagen",
          type: "upload",
          relationTo: "media",
          required: true,
        },
      ],
    },
    {
      name: "relatedProduct",
      label: "Producto relacionado",
      type: "relationship",
      relationTo: "productos",
      required: false,
      hasMany: true,
      admin: {
        position: "sidebar",
      },
    },
  ],
};

export default Examples;
