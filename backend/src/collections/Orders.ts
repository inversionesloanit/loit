import payload from "payload";
import { CollectionAfterChangeHook, CollectionConfig } from "payload/types";
import { NewOrden } from "../graphics/emails/new-orden";
import { NewOrderForAdmin } from "../graphics/emails/new-order-admin";

const afterChangeHook: CollectionAfterChangeHook = async ({
  doc, // full document data
  req, // full express request
  previousDoc, // document data before updating the collection
  operation, // name of the operation ie. 'create', 'update'
}) => {
  if (operation == "create") {
    payload.sendEmail({
      to: doc.user.email,
      subject: `Orden de compra N ${doc.number}`,
      from: "non-reply@inverloan.com",
      html: NewOrden({
        orderN: doc.number,
        name: doc.user.name,
        dni: doc.invoice.dni,
        address: doc.address.address,
        total: doc.total,
        exchange: doc.exchange.price,
      }),
    });
  }
};

const Orders: CollectionConfig = {
  slug: "ordenes",
  access: {
    read: ({ req: { user } }): boolean => user?.orders?.read,
    update: ({ req: { user } }): boolean => user?.orders?.update,
    create: ({ req: { user } }): boolean => user?.orders?.create,
    delete: ({ req: { user } }): boolean => user?.orders?.delete,
  },
  admin: {
    useAsTitle: "number",
  },
  hooks: {
    afterChange: [afterChangeHook],
  },
  fields: [
    {
      name: "number",
      label: "Numero de orden",
      type: "text",
      required: true,
      access: {
        update: () => false,
      },
    },
    {
      name: "total",
      type: "text",
      label: "Total",
      admin: { position: "sidebar" },
      access: {
        update: () => false,
      },
    },
    {
      type: "relationship",
      relationTo: "users",
      name: "user",
      label: "comprador",
      hasMany: false,
      required: true,
    },
    {
      type: "relationship",
      relationTo: "users",
      name: "tracker",
      label: "Asignar despachador",
      hasMany: false,
      required: false,
    },
    {
      type: "relationship",
      relationTo: "addresses",
      name: "address",
      label: "Direccion de despacho",
      hasMany: false,
      required: false,
    },
    {
      type: "relationship",
      relationTo: "paymentsGateway",
      name: "paymentGateway",
      label: "Medio de pago",
      hasMany: false,
      required: false,
    },
    {
      name: "bankInfo",
      type: "group",
      label: "Datos Bancarios",
      fields: [
        {
          name: "transaction",
          label: "Transacción",
          type: "text",
          required: false,
        },
        {
          name: "transmitter",
          label: "Titular",
          type: "text",
          required: false,
        },
      ],
    },
    {
      name: "paymentCash",
      label: "Pago en efectivo",
      type: "array",
      fields: [
        {
          name: "amount",
          label: "Monto",
          type: "number",
          required: true,
        },
        {
          name: "currency",
          label: "Moneda",
          type: "select",
          options: [
            {
              label: "USD",
              value: "USD",
            },
            {
              label: "VES",
              value: "VES",
            },
          ],
          required: true,
        },
      ],
      required: false,
    },
    {
      name: "notes",
      label: "Notas",
      type: "text",
      required: false,
      access: {
        update: () => false,
      },
    },
    {
      name: "exchange",
      label: "Tasa de cambio",
      type: "relationship",
      relationTo: "exchange",
      hasMany: false,
      required: true,
      admin: { position: "sidebar" },
    },
    {
      name: "invoice",
      label: "Datos de facturación",
      type: "relationship",
      relationTo: "invoices",
      hasMany: false,
      required: true,
      admin: { position: "sidebar" },
    },
    {
      name: "status",
      label: "Estado de la orden",
      type: "relationship",
      relationTo: "status-orders",
      hasMany: false,
      admin: { position: "sidebar" },
    },
    {
      name: "products",
      admin: { position: "sidebar" },
      type: "array",
      label: "Productos",
      minRows: 1,
      required: true,
      fields: [
        {
          name: "quantity",
          type: "text",
          label: "cantidad",
          defaultValue: "1",
          access: {
            update: () => false,
          },
        },
        {
          name: "price",
          type: "text",
          label: "price",
          access: {
            update: () => false,
          },
        },
        {
          name: "product",
          label: "producto",
          type: "relationship",
          relationTo: "productos",
          hasMany: true,
          required: true,
          access: {
            update: () => false,
          },
        },
      ],
    },
  ],
};

export default Orders;
