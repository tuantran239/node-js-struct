const validateFunc = (errorMessage, message) => {
  if (message) {
    return message
  }
  return errorMessage
}

export const required = (filed, message) => {
  const errorMessage = `${filed} is required`
  return validateFunc(errorMessage, message)
}

export const valid = (filed, message) => {
  const errorMessage = `${filed} not valid`
  return validateFunc(errorMessage, message)
}

export const minLength = (filed, min, message) => {
  const errorMessage = `${filed} should be at least ${min} chars long`
  return validateFunc(errorMessage, message)
}

export const maxLength = (filed, max, message) => {
  const errorMessage = `${filed} exceeds ${max} chars long`
  return validateFunc(errorMessage, message)
}

export const min = (filed, min, message) => {
  const errorMessage = `${filed} min is ${min}`
  return validateFunc(errorMessage, message)
}

export const max = (filed, max, message) => {
  const errorMessage = `${filed} max is ${max}`
  return validateFunc(errorMessage, message)
}
