require('dotenv').config()
const nodemailer = require('nodemailer')
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOSTNAME,
  port: process.env.SMTP_PORT || 465,
  secure: true,
  auth: {
    user: process.env.SMTP_USERNAME,
    pass: process.env.SMTP_PASSWORD
  }
});

(async function run() {
  console.log('Running report...');
  await transporter.sendMail({
    from: process.env.SMTP_USERNAME,
    to: process.env.SMTP_USERNAME,
    subject: 'Test Email',
    text: `This is a test email`
  });
})();