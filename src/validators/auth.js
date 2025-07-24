const Joi = require('joi');

exports.signupSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().min(6).required(),
});

exports.loginSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
});