import { config } from 'dotenv';
import { createTransport } from 'nodemailer';

config();

export default createTransport({
  host: process.env.SMTP_HOST,
  port: 465,
  security: 'SSL',
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})
