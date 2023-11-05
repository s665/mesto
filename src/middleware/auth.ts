import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import errorMessages from '../constans/errorMessages';

const { SALT = 'secret' } = process.env;

// eslint-disable-next-line consistent-return
const auth = (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res
      .status(401)
      .send({ message: errorMessages.authError });
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, SALT || 'secret');
  } catch (err) {
    res.status(401).send({ message: errorMessages.authError });
  }

  req.user = { _id: (payload as {_id: string})._id };
  next();
};

export default auth;
