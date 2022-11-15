import { Schema, model } from 'mongoose'
import { hash, compare, genSalt } from 'bcrypt'

const OtpSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  otp: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: new Date().toISOString(),
    index: { expires: 60 * 60 * 24 }
  }
})

OtpSchema.methods.compareOtp = async function (otp) {
  return await compare(otp, this.otp)
}

OtpSchema.pre('save', async function (next) {
  const otp = this
  if (otp.isModified('otp')) {
    const salt = await genSalt(10)
    otp.otp = await hash(otp.otp, salt)
  }
  next()
})

const Otp = model('Otp', OtpSchema)

export default Otp
