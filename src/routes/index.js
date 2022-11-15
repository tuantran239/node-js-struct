import { Router } from 'express'
import AuthRouter from './auth.routes'

const routes = Router()

routes.use(AuthRouter)

export default routes
