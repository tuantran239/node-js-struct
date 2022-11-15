import { Router } from 'express'
import {
  activeAccountHandler,
  authHandler,
  loginHandler,
  logoutHandler,
  resendMailHandler,
  signupHandler
} from '../controllers/auth.controllers'
import { validate } from '../middlewares'
import authenticate from '../middlewares/authenticate'
import {
  ActiveAccountSchema,
  CreateUserSchema,
  LoginSchema
} from '../validator-schema/user.schema'

const AuthRouter = Router()

AuthRouter.get('/api/auth', authenticate, authHandler)

AuthRouter.get('/api/auth/logout', authenticate, logoutHandler)

AuthRouter.post('/api/auth/signup', CreateUserSchema, validate, signupHandler)

AuthRouter.post(
  '/api/auth/active',
  ActiveAccountSchema,
  validate,
  activeAccountHandler
)

AuthRouter.post('/api/auth/resend', resendMailHandler)

AuthRouter.post('/api/auth/login', LoginSchema, validate, loginHandler)

export default AuthRouter
