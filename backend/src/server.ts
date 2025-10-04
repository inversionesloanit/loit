import express from "express";
import payload from "payload";
import nodemailer from "nodemailer";
import mailjetTransport from "nodemailer-mailjet-transport";
import path from "path";

require("dotenv").config();
const app = express();
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
  },
});

// Add your own express routes here

app.listen(8000);
