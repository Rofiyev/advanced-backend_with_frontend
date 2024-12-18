export default class BaseError extends Error {
  status: number;
  errors: any[];

  constructor(status: number, message: string, errors: any[] = []) {
    super(message);
    this.status = status;
    this.errors = errors;

    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }

  static unauthorizedError() {
    return new BaseError(401, "User is not authorized");
  }

  static badRequest(message, errors = []) {
    return new BaseError(400, message, errors);
  }
}
