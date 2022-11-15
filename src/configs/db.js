import 'dotenv/config'

const mongodb = {
  url: process.env.MONGODB_URL || ''
}

const DbConf = {
  mongodb
}

export default DbConf
