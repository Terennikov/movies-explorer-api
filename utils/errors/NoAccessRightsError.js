import { StatusCodes } from 'http-status-codes';

class NoAccessRightsError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.FORBIDDEN;
  }
}

export default NoAccessRightsError;
