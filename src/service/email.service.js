
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


async function sendTransaction(userEmail,name,amount,toAccount){
  const subject='Transaction is successfull'
  const text= `Hello ${name},\n\nYour transaction of $${amount} to account ${toAccount} was completed successfully.\n\nThank you for choosing our service!`;
  const html=`
    <div style="font-family: sans-serif; max-width: 400px; padding: 16px; border: 1px solid #e2e8f0; border-radius: 8px;">
      <h3 style="color: #10b981; margin-top: 0;">✓ Transaction Successful</h3>
      <p>Hi <b>${name}</b>, your transfer was completed.</p>
      <div style="background: #f8fafc; padding: 12px; border-radius: 6px; line-height: 1.6;">
        <div><b>Amount:</b> $${amount}</div>
        <div><b>Recipient:</b> ${toAccount}</div>
      </div>
    </div>
  `;

  await sendEmail(userEmail,subject,text,html)
}
async function sendTransactionFailureEmail(userEmail,name,amount,toAccount){
  const subject='Action Required: Transaction Failed';
  const text=`Hi ${name}, your transfer of $${amount} to account ${toAccount} failed. No money was debited from your account.`;
  const html=`
    <div style="font-family: sans-serif; max-width: 400px; padding: 16px; border: 1px solid #fee2e2; border-top: 4px solid #ef4444; border-radius: 8px;">
      <h3 style="color: #ef4444; margin-top: 0;">⚠️ Transaction Failed</h3>
      <p>Hi <b>${name}</b>, we couldn't process your transfer.</p>
      <div style="background: #f8fafc; padding: 12px; border-radius: 6px; line-height: 1.6; font-size: 14px;">
        <div><b>Amount:</b> $${amount}</div>
        <div><b>Recipient:</b> ${toAccount}</div>
      </div>
      <p style="background: #fef2f2; color: #991b1b; padding: 8px 12px; border-radius: 4px; font-size: 13px;">
        <b>Note:</b> No funds were debited from your account.
      </p>
    </div>
  `;

  await sendEmail(userEmail,subject,text,html)
}

export {sendEmail, sendRegistrationEmail, sendTransaction, sendTransactionFailureEmail}