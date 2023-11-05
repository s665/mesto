import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user';
import NotFoundError from '../helpers/notFoundError';
import errorMessages from '../constans/errorMessages';

const updateUserById = (
  userId: string | undefined,
  updateField: any,
) => User.findByIdAndUpdate(userId, updateField, { new: true });

const { SALT = 'secret' } = process.env;

export default class UserControllers {
  static login = (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    User.findUserByCredentials(email, password)
      .then((user) => {
        const token = jwt.sign(
          { _id: user._id },
          SALT,
          { expiresIn: '7d' },
        );
        res.send({ token });
      })
      .catch(next);
  };

  static getAllUsers = (req: Request, res: Response, next: NextFunction) => {
    User.find({})
      .then((userData) => {
        res.send(userData);
      })
      .catch(next);
  };

  static getUserById = (req: Request, res: Response, next: NextFunction) => {
    User.findById(req.params.userId)
      .then((userData) => {
        if (!userData) {
          throw new NotFoundError(errorMessages.clientNotFound);
        }
        res.send(userData);
      })
      .catch(next);
  };

  static createUser = (req: Request, res: Response, next: NextFunction) => {
    const { password } = req.body;
    bcrypt.hash(password, 10)
      .then((hash) => User.create({
        ...req.body,
        password: hash,
      }))
      .then((user) => {
        if (user) {
          res.status(201).send({ message: 'Пользователь успешно создан' });
        }
      })
      .catch(next);
  };

  static patchUser = (req: Request, res: Response, next: NextFunction) => {
    console.log(req.user._id);
    updateUserById(req?.user?._id, req.body)
      .then((userData) => res.status(200).send(userData))
      .catch(next);
  };

  static patchAvatarUser = (req: Request, res: Response, next: NextFunction) => {
    const { user } = req;
    updateUserById(user?._id, req.body)
      .then((userData) => res.status(200).send(userData))
      .catch(next);
  };
}
