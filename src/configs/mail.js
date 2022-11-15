import 'dotenv/config'

const MailConf = {
  user: process.env.EMAIL_USER,
  password: process.env.EMAIL_PASSWORD
}

export default MailConf
