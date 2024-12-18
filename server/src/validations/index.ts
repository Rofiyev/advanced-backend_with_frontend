import Joi from "joi";

export const registerSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().min(8).required(),
});
