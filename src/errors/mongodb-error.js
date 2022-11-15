import { Error as ErrorMongoose } from 'mongoose'

export const throwValidationError = (
  path,
  errorMessage,
  valid
) => {
  if (valid) {
    const error = new ErrorMongoose.ValidationError()
    error.errors[path] = new ErrorMongoose.ValidatorError({
      message: errorMessage,
      path
    })
    throw error
  }
}

export const handleError = (error) => {
  const errors = []
  if (error.name === 'ValidationError') {
    for (const property in error.errors) {
      if (error.errors[property].kind === 'unique') {
        continue
      }
      errors.push({
        field: property,
        message: error.errors[property].message
      })
    }
  } else if (error.name === 'MongoServerError' && error.code === 11000) {
    const property = Object.keys(error.keyPattern)[0]
    errors.push({
      field: property,
      message: `${property} is already taken`
    })
  } else {
    const errorReturn = {
      name: 'Internal',
      status: 500,
      error: [{
        field: 'server',
        message: error.message
      }]
    }
    return errorReturn
  }
  const errorReturn = { name: 'Validation', status: 400, error: errors }
  return errorReturn
}
