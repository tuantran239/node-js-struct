import mongoose from 'mongoose'
import { logger } from './utils'
import { DbConf } from './configs'

mongoose
  .connect(DbConf.mongodb.url)
  .then(() => {
    logger.info('Connected to MongoDB')
  })
  .catch((error) => {
    logger.error({ error: error.message }, 'Error connect to mongodb')
  })
