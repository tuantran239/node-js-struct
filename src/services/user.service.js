import { Jwt, Status } from '../constants'
import { handleError, throwValidationError } from '../errors/mongodb-error'
import User from '../models/User'
import { signJwt } from '../utils'

export const createUser = async (body) => {
  try {
    const user = await User.create(body)
    return { data: user, error: null }
  } catch (error) {
    const errRes = handleError(error)
    return { data: null, error: errRes }
  }
}

export const updateUser = async (
  filter = undefined,
  update = undefined,
  options = undefined
) => {
  try {
    const user = await User.findOneAndUpdate(filter, update, options)
    return { data: user, error: null }
  } catch (error) {
    const errRes = handleError(error)
    return { data: null, error: errRes }
  }
}

export const authUser = async ({ email, password }) => {
  try {
    const user = await User.findOne({ email })
    if (!user) {
      throwValidationError('email', 'email not found', true)
    }

    if (user.status !== Status.UserStatus.ACTIVE) {
      throwValidationError('user', 'user not active', true)
    }

    const isMatch = await user.comparePassword(password)
    if (!isMatch) {
      throwValidationError('password', 'password not match', true)
    }

    return { data: user, error: null }
  } catch (error) {
    const errRes = handleError(error)
    return { data: null, error: errRes }
  }
}

export const createAccessToken = (userId) =>
  signJwt(
    { userId },
    {
      expiresIn: Jwt.ACCESS_TIME
    }
  )

export const createRefreshToken = (userId) =>
  signJwt(
    { userId },
    {
      expiresIn: Jwt.REFRESH_TIME
    }
  )
