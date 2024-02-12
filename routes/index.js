import { Router } from 'express';
import userRouter from './users.js';
import moviesRouter from './movies.js';
import auth from '../middlewares/auth.js';
import { checkSigninValidation, checkSignupValidation } from '../middlewares/validations/joiAuthValidation.js';
import { createUser, login } from '../controllers/users.js';

const router = Router();
router.post('/signup', checkSignupValidation, createUser);
router.post('/signin', checkSigninValidation, login);

router.use(auth);

router.use('/movies', moviesRouter);
router.use('/users', userRouter);

export default router;
