import { celebrate, Joi } from 'celebrate';

export const checkSignupValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(2).required(),
    name: Joi.string().required(),
  }),
});

export const checkSigninValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(2).required(),
  }),
});
