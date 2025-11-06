import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export const sendEmail = async (to: string, subject: string, text: string) => {
  try {
    const info = await transporter.sendMail({
      from: `"Striv" <${process.env.SMTP_USER}>`,
      to,
      subject,
      text
    });

    console.log('Email send:', info.messageId);
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Email could not be send');
  }
}