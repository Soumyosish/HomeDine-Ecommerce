const sendEmail = require("../utils/sendEmail");

const submitForm = async (req, res) => {
  const { name, email, phone, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ message: "Please fill all required fields" });
  }

  try {
    const adminTo = process.env.CONTACT_RECEIVER || process.env.EMAIL_USER;

    const adminText = `New Contact Form Submission

Name: ${name}
Email: ${email}
Phone: ${phone || "N/A"}
Subject: ${subject}

Message:
${message}
`;

    // 2) Confirmation copy to user
    const userText = `Hi ${name},

Thank you for contacting HomeDine. We have received your message.

Subject: ${subject}
Message:
${message}

Our team will get back to you shortly.
`;

    await Promise.all([
      sendEmail({
        to: adminTo,
        subject: `Contact Form: ${subject}`,
        text: adminText,
      }),
      sendEmail({
        to: email,
        subject: `We received your message - HomeDine`,
        text: userText,
      }),
    ]);

    res
      .status(200)
      .json({ success: true, message: "Form submitted and emails sent" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error submitting form" });
  }
};

const subscribeNewsletter = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  try {
    const adminTo = process.env.CONTACT_RECEIVER || process.env.EMAIL_USER;

    await Promise.all([
      sendEmail({
        to: email,
        subject: "HomeDine Newsletter Subscription Confirmed",
        text: `Hi,

You have successfully subscribed to HomeDine newsletter.
You will now receive updates, offers, and product news.

- HomeDine Team`,
      }),
      sendEmail({
        to: adminTo,
        subject: "New Newsletter Subscriber",
        text: `New subscriber email: ${email}`,
      }),
    ]);

    res
      .status(200)
      .json({ success: true, message: "Subscription confirmed. Email sent." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to process subscription" });
  }
};

module.exports = { submitForm, subscribeNewsletter };
