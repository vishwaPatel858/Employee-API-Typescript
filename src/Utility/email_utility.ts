const nodemailer = require("nodemailer");
const randomstring = require("randomstring");
import { MailOptions } from "../Types/email_types.ts";
export const generateOtp = () => {
  return randomstring.generate({
    length: 6,
    charset: "numeric",
  });
};

const transporterOptions = {
  host: process.env.SMPT_HOST,
  port: process.env.SMPT_PORT,
  secure: true,
  auth: {
    user: "vishwap9459276@gmail.com",
    pass: "lpjb ybte qoqy utba",
  },
  service: "Gmail",
};

export const sendMail = async (options: MailOptions) => {
  try {
    const transporter = nodemailer.createTransport(transporterOptions);
    const mailOptions = {
      from: process.env.SMPT_USER,
      to: options.to,
      subject: options.subject,
      html: options.message,
    };
    const response = await transporter.sendMail(mailOptions);
    return response;
  } catch (err) {
    throw err;
  }
};

