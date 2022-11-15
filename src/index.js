import { logger } from './utils'
import app from './app'

import './mongodb'

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  logger.info(`Listening on port ${PORT}`)
})
