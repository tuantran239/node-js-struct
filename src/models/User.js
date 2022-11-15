import { Schema, model } from 'mongoose'
import { Status } from '../constants'
import { hash, genSalt, compare } from 'bcrypt'

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    status: {
      type: String,
      enum: [],
      default: Status.UserStatus.BLOCK
    }
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        delete ret.password
        return ret
      }
    }
  }
)

UserSchema.methods.comparePassword = async function (password) {
  return await compare(password, this.password)
}

UserSchema.pre('save', async function (next) {
  const user = this
  if (user.isModified('password')) {
    const salt = await genSalt(10)
    user.password = await hash(user.password, salt)
  }
  next()
})

const User = model('User', UserSchema)

export default User
