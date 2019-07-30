// Validation
const Joi = require('@hapi/joi')

// Register Validation
const registerValidation = data => {
  const registerValidationSchema = {
    name: Joi.string()
      .min(6)
      .required(),
    email: Joi.string()
      .min(6)
      .required()
      .email(),
    password: Joi.string()
      .min(6)
      .required()
  }
  return Joi.validate(data, registerValidationSchema)
}

// Login Validation
const loginValidation = data => {
  const validationSchema = {
    email: Joi.string()
      .min(6)
      .required()
      .email(),
    password: Joi.string()
      .min(6)
      .required()
  }
  return Joi.validate(data, validationSchema)
}

module.exports.registerValidation = registerValidation
module.exports.loginValidation = loginValidation
