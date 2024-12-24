import Joi from "joi";

export const registerSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
});

export const emailSchema = Joi.object({
  email: Joi.string().email().required(),
});

export const recoverySchema = Joi.object({
  token: Joi.string().required(),
  password: Joi.string().min(8).required(),
});
