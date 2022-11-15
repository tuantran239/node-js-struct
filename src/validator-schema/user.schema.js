import { checkSchema } from 'express-validator'
import { minLength, required, valid } from '../errors/validator-error-message'

export const CreateUserSchema = checkSchema({
  username: {
    notEmpty: {
      errorMessage: required('username')
    }
  },
  email: {
    notEmpty: {
      errorMessage: required('email')
    },
    isEmail: {
      errorMessage: valid('email')
    }
  },
  password: {
    notEmpty: {
      errorMessage: required('password')
    },
    isLength: {
      errorMessage: minLength('password', 6),
      options: { min: 6 }
    }
  }
})

export const ActiveAccountSchema = checkSchema({
  otp: {
    notEmpty: {
      errorMessage: required('otp')
    }
  },
  email: {
    notEmpty: {
      errorMessage: required('email')
    },
    isEmail: {
      errorMessage: valid('email')
    }
  }
})

export const LoginSchema = checkSchema({
  email: {
    notEmpty: {
      errorMessage: required('email')
    },
    isEmail: {
      errorMessage: valid('email')
    }
  },
  password: {
    notEmpty: {
      errorMessage: required('password')
    },
    isLength: {
      errorMessage: minLength('password', 6),
      options: { min: 6 }
    }
  }
})
