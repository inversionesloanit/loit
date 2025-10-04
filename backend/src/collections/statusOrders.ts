import { CollectionConfig, FieldHook } from "payload/types";

const statusOrders: CollectionConfig = {
  slug: "status-orders",
  labels: { singular: "Estado de orden", plural: "Estados de ordenes" },
  access: {
    read: (): boolean => true, // Everyone can read Media
    update: ({ req: { user } }): boolean => user?.statusOrders?.update,
    create: ({ req: { user } }): boolean => user?.statusOrders?.create,
    delete: ({ req: { user } }): boolean => user?.statusOrders?.delete,
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
  ],
};

export default statusOrders;
