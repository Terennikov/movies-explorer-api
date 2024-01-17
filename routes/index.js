import { Router } from 'express';
import userRouter from './users.js';
import moviesRouter from './movies.js';
import auth from '../middlewares/auth.js';
import { checkSigninValidation, checkSignupValidation } from '../middlewares/joiAuthValidation.js';
import { createUser, login } from '../controllers/users.js';

const router = Router();
router.post('/signup', checkSignupValidation, createUser);
router.post('/signin', checkSigninValidation, login);
router.use('/movies', auth, moviesRouter);
router.use('/users', auth, userRouter);

export default router;
