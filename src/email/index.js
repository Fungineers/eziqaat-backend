import { createTransport } from "nodemailer";
import hbs from "nodemailer-express-handlebars";
import path from "path";

const transporter = createTransport({
  service: "gmail",
  auth: {
    user: "team.eziqaat@gmail.com",
    pass: "vdwawrjwbvpyanqg",
  },
});

transporter.use(
  "compile",
  hbs({
    viewEngine: {
      partialsDir: path.resolve(__dirname, "views"),
      defaultLayout: false,
    },
    viewPath: path.resolve(__dirname, "views"),
  })
);

const composeEmailOptions = ({ to, subject, template, context }) => ({
  from: '"Eziqaat" <team.eziqaat@gmail.com>',
  to,
  subject,
  template,
  context,
});

const sendEmail = (mailOptions) => {
  transporter
    .sendMail(mailOptions)
    .then((info) => {
      console.log("+ Email sent: ", info);
    })
    .catch((err) => {
      console.log("- Email error: ", err);
    });
};

/**
 * @param {{ to: string; context: { name: string; time: string; email: string; otp: string; }; }} options
 */
export const sendRegisterEmail = ({ to, context }) => {
  const mailOptions = composeEmailOptions({
    to,
    subject: "Welcome to Eziqaat",
    template: "register",
    context,
  });
  sendEmail(mailOptions);
};

/**
 * @param {{ to: string; context: { name: string; time: string; email: string; otp: string; }; }} options
 */
export const sendResetEmail = ({ to, context }) => {
  const mailOptions = composeEmailOptions({
    to,
    subject: "Reset Email",
    template: "reset-email",
    context,
  });
  sendEmail(mailOptions);
};

/**
 * @param {{ to: string; context: { otp: string; }; }} options
 */
export const sendRequestOtpEmail = ({ to, context }) => {
  const mailOptions = composeEmailOptions({
    to,
    subject: "OTP for Email Verification",
    template: "request-otp",
    context,
  });
  sendEmail(mailOptions);
};
