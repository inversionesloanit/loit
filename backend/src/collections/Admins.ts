import { CollectionAfterChangeHook, CollectionConfig } from "payload/types";
import { NewUser } from "../graphics/emails/new-user";
import payload from "payload";
import { ForgotPassword } from "../graphics/emails/forgot";

const afterChangeHook: CollectionAfterChangeHook = async ({
  doc, // full document data
  req, // full express request
  previousDoc, // document data before updating the collection
  operation, // name of the operation ie. 'create', 'update'
}) => {
  if (operation == "create") {
    payload.sendEmail({
      to: doc.email,
      subject: "Bienvenido a Inversiones Loan",
      from: "non-reply@inverloan.com",
      html: NewUser(doc.name),
    });
  }
};

const Admins: CollectionConfig = {
  slug: "admins",
  auth: {
    useAPIKey: true,
    forgotPassword: {
      generateEmailHTML: ({ req, token, user }) =>
        ForgotPassword({ req, token, user }),
      generateEmailSubject: ({ req, token, user }) =>
        `Hola! ${user.name}, cambia aqui tu contraseña`,
    },
  },
  admin: {
    useAsTitle: "email",
  },
  access: {
    read: (): boolean => true, // Temporalmente permitir lectura para todos
    update: (): boolean => true, // Temporalmente permitir actualización para todos
    create: (): boolean => true, // Temporalmente permitir creación para todos
    delete: (): boolean => true, // Temporalmente permitir eliminación para todos
  },
  hooks: {
    afterChange: [afterChangeHook],
  },
  fields: [
    // Email added by default
    // Add more fields as needed
    {
      name: "name",
      type: "text",
      label: "Nombre",
      defaultValue: " ",
      required: true,
    },
    {
      type: "group",
      name: "products",
      label: "Productos",
      fields: [
        {
          type: "checkbox",
          name: "create",
          defaultValue: true,
          label: "Crear productos",
        },
        {
          type: "checkbox",
          name: "read",
          defaultValue: true,
          label: "Leer productos",
        },
        {
          type: "checkbox",
          name: "update",
          defaultValue: true,
          label: "Actualizar productos",
        },
        {
          type: "checkbox",
          name: "delete",
          defaultValue: true,
          label: "Eliminar productos",
        },
      ],
    },
    {
      type: "group",
      name: "pages",
      label: "roles paginas",
      fields: [
        {
          type: "checkbox",
          name: "create",
          defaultValue: true,
          label: "Crear paginas",
        },
        {
          type: "checkbox",
          name: "read",
          defaultValue: true,
          label: "Leer paginas",
        },
        {
          type: "checkbox",
          name: "update",
          defaultValue: true,
          label: "Actualizar paginas",
        },
        {
          type: "checkbox",
          name: "delete",
          defaultValue: true,
          label: "Eliminar paginas",
        },
      ],
    },
    {
      type: "group",
      name: "categories",
      label: "Rol para las categorias",
      fields: [
        {
          type: "checkbox",
          name: "create",
          defaultValue: true,
          label: "Crear categoria",
        },
        {
          type: "checkbox",
          name: "read",
          defaultValue: true,
          label: "Leer categoria",
        },
        {
          type: "checkbox",
          name: "update",
          defaultValue: true,
          label: "Actualizar categoria",
        },
        {
          type: "checkbox",
          name: "delete",
          defaultValue: true,
          label: "Eliminar categoria",
        },
      ],
    },
    {
      type: "group",
      name: "orders",
      label: "Roles para ordenes",
      fields: [
        {
          type: "checkbox",
          name: "create",
          defaultValue: true,
          label: "Crear ordenes",
        },
        {
          type: "checkbox",
          name: "read",
          defaultValue: true,
          label: "Leer ordenes",
        },
        {
          type: "checkbox",
          name: "update",
          defaultValue: true,
          label: "Actualizar ordenes",
        },
        {
          type: "checkbox",
          name: "delete",
          defaultValue: true,
          label: "Eliminar ordenes",
        },
      ],
    },
    {
      type: "group",
      name: "tags",
      label: "Roles para las etiquetas",
      fields: [
        {
          type: "checkbox",
          name: "create",
          defaultValue: true,
          label: "Crear etiquetas",
        },
        {
          type: "checkbox",
          name: "read",
          defaultValue: true,
          label: "Leer etiquetas",
        },
        {
          type: "checkbox",
          name: "update",
          defaultValue: true,
          label: "Actualizar etiquetas",
        },
        {
          type: "checkbox",
          name: "delete",
          defaultValue: true,
          label: "Eliminar etiquetas",
        },
      ],
    },
    {
      type: "group",
      name: "users",
      label: "Roles para los usuarios",
      fields: [
        {
          type: "checkbox",
          name: "create",
          defaultValue: true,
          label: "Crear usuarios",
        },
        {
          type: "checkbox",
          name: "read",
          defaultValue: true,
          label: "Leer usuarios",
        },
        {
          type: "checkbox",
          name: "update",
          defaultValue: true,
          label: "Actualizar usuarios",
        },
        {
          type: "checkbox",
          name: "delete",
          defaultValue: true,
          label: "Eliminar usuarios",
        },
      ],
    },
    {
      type: "group",
      name: "addresses",
      label: "Roles para las direcciones",
      fields: [
        {
          type: "checkbox",
          name: "create",
          defaultValue: true,
          label: "Crear direcciones",
        },
        {
          type: "checkbox",
          name: "read",
          defaultValue: true,
          label: "Leer direcciones",
        },
        {
          type: "checkbox",
          name: "update",
          defaultValue: true,
          label: "Actualizar direcciones",
        },
        {
          type: "checkbox",
          name: "delete",
          defaultValue: true,
          label: "Eliminar direcciones",
        },
      ],
    },
    {
      type: "group",
      name: "payments",
      label: "Roles para los pagos",
      fields: [
        {
          type: "checkbox",
          name: "create",
          defaultValue: true,
          label: "Crear medios de pago",
        },
        {
          type: "checkbox",
          name: "read",
          defaultValue: true,
          label: "Leer medios de pago",
        },
        {
          type: "checkbox",
          name: "update",
          defaultValue: true,
          label: "Actualizar medios de pago",
        },
        {
          type: "checkbox",
          name: "delete",
          defaultValue: true,
          label: "Eliminar medios de pago",
        },
      ],
    },
    {
      type: "group",
      name: "statusOrders",
      label: "Roles para los estado de ordenes",
      fields: [
        {
          type: "checkbox",
          name: "create",
          defaultValue: true,
          label: "Crear estados de ordenes",
        },
        {
          type: "checkbox",
          name: "read",
          defaultValue: true,
          label: "Leer estados de ordenes",
        },
        {
          type: "checkbox",
          name: "update",
          defaultValue: true,
          label: "Actualizar estados de ordenes",
        },
        {
          type: "checkbox",
          name: "delete",
          defaultValue: true,
          label: "Eliminar estados de ordenes",
        },
      ],
    },
    {
      type: "group",
      name: "exchange",
      label: "Roles para la tasa de cambio",
      fields: [
        {
          type: "checkbox",
          name: "create",
          defaultValue: true,
          label: "Crear tasa de cambio",
        },
        {
          type: "checkbox",
          name: "read",
          defaultValue: true,
          label: "Leer tasa de cambio",
        },
        {
          type: "checkbox",
          name: "update",
          defaultValue: true,
          label: "Actualizar tasa de cambio",
        },
        {
          type: "checkbox",
          name: "delete",
          defaultValue: true,
          label: "Eliminar tasa de cambio",
        },
      ],
    },
    {
      type: "group",
      name: "invoices",
      label: "Roles para la facturación",
      fields: [
        {
          type: "checkbox",
          name: "create",
          defaultValue: true,
          label: "Crear facturas",
        },
        {
          type: "checkbox",
          name: "read",
          defaultValue: true,
          label: "Leer facturas",
        },
        {
          type: "checkbox",
          name: "update",
          defaultValue: true,
          label: "Actualizar facturas",
        },
        {
          type: "checkbox",
          name: "delete",
          defaultValue: true,
          label: "Eliminar facturas",
        },
      ],
    },
  ],
};

export default Admins;
