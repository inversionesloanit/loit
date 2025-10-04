import express from "express";
import payload from "payload";
import nodemailer from "nodemailer";
import mailjetTransport from "nodemailer-mailjet-transport";
import path from "path";
import cors from "cors";

require("dotenv").config();
const app = express();

const allowedOrigins = [
  'http://148.113.136.150',
  'http://localhost:3000', // Asumiendo que el frontend se ejecuta en localhost:3000 durante el desarrollo
  'http://localhost:3001', // Otro posible puerto de desarrollo
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));

app.use("/assets", express.static(path.resolve(__dirname, "./assets")));

// Redirect root to Admin panel
app.get("/", (_, res) => {
  res.redirect("/admin");
});

// Initialize Payload
payload.init({
  secret: process.env.PAYLOAD_SECRET,
  mongoURL: process.env.MONGODB_URI,
  email:
    process.env.MJ_APIKEY_PUBLIC && process.env.MJ_APIKEY_PUBLIC
      ? {
          fromAddress: "non-reply@inverloan.com",
          fromName: "Inversiones Loan",
          transport: nodemailer.createTransport(
            mailjetTransport({
              host: "in-v3.mailjet.com",
              port: 587,
              auth: {
                apiKey: process.env.MJ_APIKEY_PUBLIC,
                apiSecret: process.env.MJ_APIKEY_PRIVATE,
              },
            })
          ),
        }
      : null,
  express: app,
  onInit: () => {
    payload.logger.info(`Payload Admin URL: ${payload.getAdminURL()}`);
    app.listen(process.env.PORT || 3000, () => {
      payload.logger.info(`Backend is running on port ${process.env.PORT || 3000}`);
    });
  },
});

// Add your own express routes here
