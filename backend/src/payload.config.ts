import { buildConfig } from "payload/config";
import path from "path";
import Products from "./collections/Products";
import Users from "./collections/Users";
import Media from "./collections/Media";
import Categories from "./collections/Categories";
import Orders from "./collections/Orders";
import Tags from "./collections/Tags";
import Pages from "./collections/Pages";
import Addresses from "./collections/Adresses";
import paymentsGateway from "./collections/PaymentGateway";
import statusOrders from "./collections/statusOrders";
import Exchange from "./collections/exchange";
import Invoices from "./collections/invoices";
import { Logo } from "./graphics/Logo";
import { Icon } from "./graphics/Icon";
import Admins from "./collections/Admins";

export default buildConfig({
  serverURL: process.env.PAYLOAD_URL,
  admin: {
    user: Admins.slug,
    meta: {
      titleSuffix: "- Administrativo web",
      favicon: "/assets/logo.png",
      ogImage: "/assets/logo.png",
    },
    components: {
      graphics: {
        Logo,
        Icon,
      },
    },
  },
  cors: [
    "http://localhost:8080",
    "https://inverloan.com",
    "https://inverloan.com/",
    "http://localhost:3000",
    "https://adonai.inverloan.com",
    "http://adonai.inverloan.com/",
    "http://adonai.inverloan.com",
    "https://www.adonai.inverloan.com",
    "https://front.inverloan.com",
    "https://www.front.inverloan.com",
    "https://localhost:8000",
    "http://localhost:8000",
  ],
  csrf: [
    "http://localhost:8080",
    "https://inverloan.com",
    "https://inverloan.com/",
    "http://localhost:3000",
    "https://adonai.inverloan.com",
    "http://adonai.inverloan.com/",
    "http://adonai.inverloan.com",
    "https://www.adonai.inverloan.com",
    "https://front.inverloan.com",
    "https://www.front.inverloan.com",
    "https://localhost:8000",
    "http://localhost:8000",
  ],
  rateLimit: {
    trustProxy: true,
  },
  collections: [
    Users,
    // Add Collections here
    Pages,
    Products,
    Media,
    Categories,
    Orders,
    Tags,
    Addresses,
    paymentsGateway,
    statusOrders,
    Exchange,
    Invoices,
    Admins,
  ],
  typescript: {
    outputFile: path.resolve(__dirname, "payload-types.ts"),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, "generated-schema.graphql"),
  },
});
