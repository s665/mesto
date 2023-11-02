import { NextFunction, Request, Response } from 'express';
import User from '../models/user';
import { IAuthRequest } from '../types';
import NotFoundError from '../helpers/notFoundError';
import errorMessages from '../constans/errorMessages';

export default class UserControllers {
  static getAllUsers = (req: Request, res: Response, next: NextFunction) => {
    User.find({})
      .then((userData) => {
        res.send(userData);
      })
      .catch(next);
  };

  static getUserById = (req: IAuthRequest, res: Response, next: NextFunction) => {
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
    const { about, name, avatar } = req.body;
    User.create({
      about,
      avatar,
      name,
    }).then((user) => res.status(201).send(user))
      .catch(next);
  };

  static patchUser = (req: IAuthRequest, res: Response, next: NextFunction) => {
    const { user } = req;
    const { about, name } = req.body;
    User.findByIdAndUpdate(user?._id, { about, name }, { new: true })
      .then((userData) => res.status(200).send(userData))
      .catch(next);
  };

  static patchAvatarUser = (req: IAuthRequest, res: Response, next: NextFunction) => {
    const { user } = req;
    const { avatar } = req.body;
    User.findByIdAndUpdate(user?._id, { avatar }, { new: true })
      .then((userData) => res.status(200).send(userData))
      .catch(next);
  };
}
