import { handleError, throwValidationError } from '../errors/mongodb-error'
import Otp from '../models/Otp'
import { sendmail } from '../utils/mail'

export const createOtp = async (email, otp) => {
  try {
    await Otp.create({ email, otp })
    return { data: true, error: null }
  } catch (error) {
    const errRes = handleError(error)
    return { data: null, error: errRes }
  }
}

export const updateOtp = async (
  filter = undefined,
  update = undefined,
  options = undefined
) => {
  try {
    const otp = await Otp.findOneAndUpdate(filter, update, options)
    return { data: otp, error: null }
  } catch (error) {
    const errRes = handleError(error)
    return { data: null, error: errRes }
  }
}

export const deleteOtp = async (email) => {
  try {
    await Otp.deleteMany({ email })
    return { data: true, error: null }
  } catch (error) {
    const errRes = handleError(error)
    return { data: null, error: errRes }
  }
}

export const checkOtp = async ({ email, otp }) => {
  try {
    const otpExist = await Otp.find({ email })
    if (otpExist.length === 0) {
      throwValidationError('otp', 'Otp expired', true)
    }

    const isValid = await otpExist[otpExist.length - 1].compareOtp(otp)
    if (!isValid) {
      throwValidationError('otp', 'Otp not valid', true)
    }

    return { data: true, error: null }
  } catch (error) {
    const errRes = handleError(error)
    return { data: null, error: errRes }
  }
}

export const sendOtp = async ({ email, otp }) => {
  try {
    const html = `<h3>${otp}</h3>`
    await sendmail({ email, html })
  } catch (error) {
    return {
      data: null,
      error: [
        {
          name: 'mail',
          status: 500,
          error: {
            message: error.message,
            field: 'mail'
          }
        }
      ]
    }
  }
}
