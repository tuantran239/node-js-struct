import {
  authUser,
  createAccessToken,
  createRefreshToken,
  createUser,
  updateUser
} from '../services/user.service'
import {
  checkOtp,
  createOtp,
  deleteOtp,
  sendOtp
} from '../services/otp.service'
import { generateOtp } from '../utils/common'
import { Cookie, Status } from '../constants'

export const signupHandler = async (req, res, next) => {
  const { error, data: user } = await createUser(req.body)
  if (error) {
    req.error = error
    return next()
  }

  const otp = generateOtp(6)
  Promise.all([createOtp(user.email, otp), sendOtp({ email: user.email, otp })])

  return res.status(201).send({
    success: true,
    email: user.email
  })
}

export const resendMailHandler = async (req, res, next) => {
  const { email } = req.body

  const otp = generateOtp(6)
  Promise.all([createOtp(email, otp), sendOtp({ email, otp })])

  return res.status(200).send({
    success: true
  })
}

export const activeAccountHandler = async (req, res, next) => {
  const { email } = req.body

  const { error } = await checkOtp(req.body)
  if (error) {
    req.error = error
    return next()
  }

  await updateUser(
    {
      email
    },
    { status: Status.UserStatus.ACTIVE }
  )
  await deleteOtp(email)

  return res.status(201).send({
    success: true
  })
}

export const loginHandler = async (req, res, next) => {
  const { error, data: user } = await authUser(req.body)
  if (error) {
    req.error = error
    return next()
  }

  const access_token = createAccessToken(user._id)
  const refresh_token = createRefreshToken(user._id)

  res.cookie('access_token', access_token, { maxAge: Cookie.AGE })
  res.cookie('refresh_token', refresh_token, { maxAge: Cookie.AGE })

  return res.status(201).send({
    status: 'success'
  })
}

export const logoutHandler = async (req, res, next) => {
  res.clearCookie('access_token')
  res.clearCookie('refresh_token')
  return res.status(201).send({
    status: 'success'
  })
}

export const authHandler = async (req, res) => {
  res.status(200).send({
    user: req.user
  })
}
