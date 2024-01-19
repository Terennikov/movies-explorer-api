import Jwt from 'jsonwebtoken';
import UnauthorizedError from '../utils/errors/UnauthorizedError.js';
import { errorstxt } from '../utils/errorsAndResponses.js';

const { JWT_SECRET, NODE_ENV } = process.env;
const auth = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new UnauthorizedError(errorstxt.authNeed);
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = Jwt.verify(token, NODE_ENV ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    throw new UnauthorizedError(errorstxt.notRightAuthToken);
  }

  req.user = payload;
  next();
  return req.user;
};
export default auth;
