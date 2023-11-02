import { NextFunction, Request, Response } from 'express';
import { errors, isCelebrateError } from 'celebrate';
import NotFoundError from '../helpers/notFoundError';

const handleError = (
  err: NotFoundError,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { message, statusCode = 500 } = err;

  if (isCelebrateError(err)) {
    let celebrateMessage = '';

    // eslint-disable-next-line no-restricted-syntax
    for (const joiError of err.details.values()) {
      celebrateMessage = joiError.message;
    }
    res.status(400).send({ message: celebrateMessage });
    return;
  }

  res
    .status(statusCode)
    .send({ message: statusCode === 500 ? 'На сервере произошла ошибка' : message });
  next();
};

export default handleError;
