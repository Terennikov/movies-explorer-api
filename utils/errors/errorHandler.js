import { StatusCodes } from 'http-status-codes';
import { errorstxt } from '../errorsAndResponses.js';

const errorHandler = (err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res
    .status(statusCode)
    .send({
      message: statusCode === StatusCodes.INTERNAL_SERVER_ERROR
        ? errorstxt.serverError
        : message,
    });
};

export default errorHandler;
