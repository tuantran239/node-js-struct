import GenOtp from 'otp-generator'
import { Types } from '../constants'

export const generateOtp = (num) =>
  GenOtp.generate(num, {
    digits: true,
    upperCaseAlphabets: false,
    specialChars: false,
    lowerCaseAlphabets: false
  })

export const checkType = (input, type) =>
  Object.prototype.toString.call(input).slice(8, -1).toLocaleLowerCase() ===
  type

export const mapObjectToArray = (obj) => {
  if (checkType(obj, Types.OBJECT)) {
    return Object.values(obj).map((v) => v)
  }
  return []
}
