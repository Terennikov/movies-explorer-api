import { Router } from 'express';
import { updateProfile, getCurrentUser } from '../controllers/users.js';
import checkPatchUserValidation from '../middlewares/validations/joiUsersValidation.js';

const userRouter = Router();

userRouter.get('/me', getCurrentUser);
userRouter.patch('/me', checkPatchUserValidation, updateProfile);

export default userRouter;
