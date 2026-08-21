
import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: process.env.EMAIL_USER,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken: process.env.REFRESH_TOKEN,
  },
});

// Verify the connection configuration
transporter.verify((error, success) => {
  if (error) {
    console.error('Error connecting to email server:', error);
  } else {
    console.log('Email server is ready to send messages');
  }
});

// Function to send email
const sendEmail = async (to, subject, text, html) => {

    const info = await transporter.sendMail({
      from: `"Backend Ledger" <${process.env.EMAIL_USER}>`, // sender address
      to, // list of receivers
      subject, // Subject line
      text, // plain text body
      html, // html body
    });

    console.log('Message sent: %s', info.messageId);
    return info;
  } 


async function sendRegistrationEmail(userEmail, name) {
   const subject = "Welcome to Backend Ledger";

const text = `Hello ${name},

Welcome to Backend Ledger!

Your account has been successfully created. You can now securely access your account and start using Backend Ledger.

If you did not create this account, please contact our support team immediately.

Best regards,
The Backend Ledger Team`;

const html = `
    <p>Hello ${name},</p>

    <p>Welcome to <strong>Backend Ledger</strong>!</p>

    <p>
        Your account has been successfully created.
        You can now securely access your account and start using Backend Ledger.
    </p>

    <p>
        If you did not create this account, please contact our support team immediately.
    </p>

    <p>
        Best regards,<br>
        <strong>The Backend Ledger Team</strong>
    </p>
`;

    await sendEmail(userEmail, subject, text, html);
}


export {sendEmail, sendRegistrationEmail}