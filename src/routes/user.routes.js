import { Router } from 'express'

const AuthRouter = Router()

AuthRouter.post('/api/auth/signup', CreateUserSchema, validate, signupHandler)

export default AuthRouter
