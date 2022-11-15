import { Cookie } from '../constants'
import { createAccessToken } from '../services/user.service'
import { verifyJwt } from '../utils/jwt'

const deserializeUser = (req, res, next) => {
  const access_token = req.cookies['access_token']
  const refresh_token = req.cookies['refresh_token']

  if (!access_token) {
    return next()
  }

  const { valid, expired, decode } = verifyJwt(access_token)
  if (valid) {
    req.user = decode.userId
  }
  if (!valid && !expired) {
    return next()
  }

  if (expired && refresh_token) {
    const { decode } = verifyJwt(refresh_token)
    if (decode) {
      const new_token = createAccessToken(decode.userId)
      res.cookie('access_token', new_token, { maxAge: Cookie.AGE })
      req.user = decode.userId
    }
  }

  next()
}

export default deserializeUser
