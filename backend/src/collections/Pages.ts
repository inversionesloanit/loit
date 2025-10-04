import { CollectionConfig } from "payload/types";

const Pages: CollectionConfig = {
  slug: "paginas",
  access: {
    read: (): boolean => true, // Everyone can read Media
    update: ({ req: { user } }): boolean => user.pages.update,
    create: ({ req: { user } }): boolean => user.pages.create,
    delete: ({ req: { user } }): boolean => user.pages.delete,
  },
  admin: {
    useAsTitle: "title",
  },
  fields: [
    {
      name: "title",
      label: "Nombre de la pagina",
      type: "text",
      required: true,
    },
    {
      type: "textarea",
      name: "description",
      label: "descripción",
    },
    {
      type: "relationship",
      relationTo: "productos",
      name: "relatedProducts",
      label: "Productos destacados",
      hasMany: true,
    },
    {
      type: "relationship",
      relationTo: "categorias",
      name: "relatedCategories",
      label: "Categorias destacadas",
      hasMany: true,
    },
    {
      type: "array",
      name: "mainBanner",
      label: "Carrusel de imagenes destacadas",
      minRows: 0,
      maxRows: 4,
      fields: [
        {
          name: "banners",
          type: "upload",
          label: "Imagen destacada",
          relationTo: "media",
        },
        {
          name: "redirectTo",
          label: "Redireccionar a (URL)",
          type: "text",
          required: false,
        },
      ],
    },
    {
      type: "array",
      name: "banners",
      label: "Carrusel de imagenes",
      minRows: 0,
      maxRows: 8,
      fields: [
        {
          name: "banners",
          type: "upload",
          label: "Carrusel de imagenes",
          relationTo: "media",
        },
        {
          name: "redirectTo",
          label: "Redireccionar a (URL)",
          type: "text",
          required: false,
        },
      ],
    },
  ],
};

export default Pages;
