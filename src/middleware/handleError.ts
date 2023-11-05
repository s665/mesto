import { NextFunction, Request, Response } from 'express';
import { isCelebrateError } from 'celebrate';
import mongoose from 'mongoose';
import NotFoundError from '../helpers/notFoundError';
import errorMessages from '../constans/errorMessages';
import UnauthorizedError from '../helpers/unauthorizedError';

type Error = NotFoundError
  | typeof mongoose.mongo.MongoServerError
  | mongoose.Error
  | UnauthorizedError

type HandleErrorType = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction)
  => void

const handleError:HandleErrorType = (err, req, res, next) => {
  if (isCelebrateError(err)) {
    let celebrateMessage = '';

    // eslint-disable-next-line no-restricted-syntax
    for (const joiError of err.details.values()) {
      celebrateMessage = joiError.message;
    }
    res.status(400).send({ message: celebrateMessage });
    return;
  }

  // @ts-ignore
  if (err instanceof mongoose.Error) {
    res.status(400).send({ message: err.message });
  }

  if (err instanceof mongoose.mongo.MongoServerError && err.code === 11000) {
    res.status(409).send({ message: errorMessages.duplicateUser });
  }

  if (err instanceof NotFoundError) {
    const { message, statusCode = 500 } = err;

    res
      .status(statusCode)
      .send({ message: statusCode === 500 ? 'На сервере произошла ошибка' : message });
  }

  next();
};

export default handleError;
