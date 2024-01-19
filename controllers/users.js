import mongoose from 'mongoose';
import { StatusCodes } from 'http-status-codes';
import bcrypt from 'bcrypt';
import User from '../models/User.js';
import auth from '../utils/jwt.js';
import BadRequestError from '../utils/errors/BadRequestError.js';
import NotFoundError from '../utils/errors/NotFoundError.js';
import UnauthorizedError from '../utils/errors/UnauthorizedError.js';
import UserAlreadExistsError from '../utils/errors/UserAlreadyExistsError.js';
import { errorstxt } from '../utils/errorsAndResponses.js';

const { SALT_ROUNDS = 10 } = process.env;

export const createUser = async (req, res, next) => {
  try {
    const { email, password, name } = req.body;
    const hash = await bcrypt.hash(password, SALT_ROUNDS);
    const newUser = await User.create({ email, password: hash, name });
    return res.status(StatusCodes.CREATED).send({
      email: newUser.email,
      _id: newUser._id,
      name: newUser.name,
    });
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return next(new BadRequestError(error));
    }
    if (error.code === errorstxt.ERROR_CODE_DUPLICATE_MONGO) {
      return next(new UserAlreadExistsError(errorstxt.alreadyExists));
    }
    return next(error);
  }
};

export const getCurrentUser = async (req, res, next) => {
  try {
    const currentUser = await User.findById(req.user._id);
    if (!currentUser) {
      throw new NotFoundError(errorstxt.idNotFounded);
    }
    return res.status(StatusCodes.OK).send({
      name: currentUser.name,
      email: currentUser.email,
    });
  } catch (error) {
    return next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }, { runValidators: true }).select('+password');
    if (!user) {
      throw new UnauthorizedError(errorstxt.notFoundEmail);
    }
    const matched = await bcrypt.compare(String(password), user.password);
    if (!matched) {
      throw new UnauthorizedError(errorstxt.notRightPassword);
    }
    const token = auth({ _id: user._id });
    return res.send({ token: `${token}` });
  } catch (error) {
    return next(error);
  }
};

async function findByIdAndUpdate(reqId, reqBody, next) {
  try {
    const currentUser = await User.findByIdAndUpdate(reqId, reqBody, {
      new: true,
      runValidators: true,
    });
    if (!currentUser) {
      throw new mongoose.Error.DocumentNotFoundError();
    }
    return currentUser;
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return next(new BadRequestError(error));
    }
    if (error instanceof mongoose.Error.DocumentNotFoundError) {
      return next(new NotFoundError(errorstxt.idNotFounded));
    }
    if (error.code === errorstxt.ERROR_CODE_DUPLICATE_MONGO) {
      return next(new UserAlreadExistsError(errorstxt.emailIsAlreadyUse));
    }
    return next(error);
  }
}

export const updateProfile = async (req, res, next) => {
  try {
    const user = await findByIdAndUpdate(req.user._id, req.body, next);
    if (user) {
      return res.status(StatusCodes.OK).send(user);
    }
    return false;
  } catch (error) {
    return next(error);
  }
};
