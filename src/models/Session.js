import { Schema, model } from 'mongoose'

const SessionSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    required: true
  }
})

const Session = model('Session', SessionSchema)

export default Session
