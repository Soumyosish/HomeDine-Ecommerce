const nodemailer = require("nodemailer");

const sendEmail = async (options = {}) => {
  const to = options.to || options.email; // support both keys
  if (!to) {
    throw new Error("No recipients defined");
  }

  const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE || "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: process.env.EMAIL_FROM || `"HomeDine" <${process.env.EMAIL_USER}>`,
    to,
    subject: options.subject || "HomeDine Notification",
    text: options.text || "",
    html: options.html || "",
  });
};

module.exports = sendEmail;
