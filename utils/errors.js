class GeneralError extends Error {
  constructor(message) {
    super();
    this.message = message;
  }

  getCode() {
    if (this instanceof BadRequest) {
      return 400;
    }
    if (this instanceof DuplicateUser) {
      return 400;
    }
    if (this instanceof InvalidCredentials) {
      return 401;
    }
    if (this instanceof WrongCredentials) {
      return 403;
    }
    if (this instanceof NotFound) {
      return 404;
    }

    return 500;
  }

  response() {
    return {
      success: false,
      message: `Error message: ${this.message}.`,
    };
  }
}

class BadRequest extends GeneralError {}
class NotFound extends GeneralError {}
class DuplicateUser extends GeneralError {}
class WrongCredentials extends GeneralError {}
class InvalidCredentials extends GeneralError {}

//   module.exports
module.exports = {
  GeneralError,
  BadRequest,
  NotFound,
  DuplicateUser,
  WrongCredentials,
  InvalidCredentials,
};
