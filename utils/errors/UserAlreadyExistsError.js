import { StatusCodes } from 'http-status-codes';

class UserAlreadExistsError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.CONFLICT;
  }
}

export default UserAlreadExistsError;
