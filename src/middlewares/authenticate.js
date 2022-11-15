import User from '../models/User'

const authenticate = async (req, res, next) => {
  if (!req.user) {
    return res.status(401).send({
      error: [
        {
          name: 'Unauthorized',
          status: 401,
          error: {
            message: 'Unauthorized',
            field: 'auth'
          }
        }
      ]
    })
  }

  const user = await User.findById({ _id: req.user })
  req.user = user

  next()
}

export default authenticate
