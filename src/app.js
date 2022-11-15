import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import routes from './routes'
import cookieParser from 'cookie-parser'

import 'dotenv/config'
import { errorMiddleware } from './middlewares'
import deserializeUser from './middlewares/deserializeUser'

const app = express()

app.use(
  cors({
    credentials: true
  })
)
app.use(bodyParser.json())
app.use(cookieParser())

app.use(deserializeUser)

app.use(routes)

app.use(errorMiddleware)

export default app
