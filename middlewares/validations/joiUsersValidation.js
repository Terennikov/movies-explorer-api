import { celebrate, Joi } from 'celebrate';

const checkPatchUserValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().email().required(),
  }),
});

export default checkPatchUserValidation;
