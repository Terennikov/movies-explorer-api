import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';
import { updateProfile, getCurrentUser } from '../controllers/users.js';

const userRouter = Router();

userRouter.get('/me', getCurrentUser);

userRouter.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().email().required(),
  }),
}), updateProfile);

export default userRouter;

