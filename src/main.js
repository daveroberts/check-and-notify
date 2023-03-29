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
  let now = new Date()
  let day_of_month = now.getDate() // Independence Day == 4
  let day_of_week = now.getDay() // 0 Sunday, 1 Monday
  let hour = now.getHours() // 8AM == 8, 8PM == 20
  if (day_of_week == 0 && hour == 18){ await send_email("Task: Take out trash") } // Sunday at 6PM
  if (day_of_week == 3 && hour == 18){ await send_email("Task: Take out trash") } // Wednesday at 6PM
  if (day_of_month == 28 && hour == 6){ await send_email("Task: Pay Citi CC Bill") } // 28th of the month at 6AM
  if (day_of_week == 4 && hour == 12){ await send_email("Task: Epic Games free game of the week") } // Thursday at noon
})();

async function send_email(subject){
  await transporter.sendMail({
    from: process.env.SMTP_USERNAME,
    to: process.env.SMTP_USERNAME,
    subject: subject,
    text: ''
  });
}