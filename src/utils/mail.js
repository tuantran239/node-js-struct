import nodemailer from 'nodemailer'
import { MailConf } from '../configs'

export const sendmail = async (inputs) => {
  const { email, html, text, subject } = inputs

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: MailConf.user,
      pass: MailConf.password
    }
  })

  await transporter.sendMail({
    from: '"Admin" <admin@example.com>',
    to: email,
    subject,
    text,
    html
  })
}
