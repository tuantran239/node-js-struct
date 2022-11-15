import jwt from 'jsonwebtoken'
import { JWTConf } from '../configs'

export const signJwt = (payload, options = undefined) => {
  return jwt.sign(payload, JWTConf.secret, options)
}

export const verifyJwt = (token, options = undefined) => {
  try {
    const decode = jwt.verify(token, JWTConf.secret, options)
    return {
      valid: true,
      expired: false,
      decode
    }
  } catch (error) {
    return {
      valid: false,
      expired: error.message === 'jwt expired',
      decode: null
    }
  }
}
