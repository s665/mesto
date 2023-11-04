import { NextFunction, Response, Request } from 'express';
import User from '../models/user';
import NotFoundError from '../helpers/notFoundError';
import errorMessages from '../constans/errorMessages';

const updateUserById = (
  userId: string | undefined,
  updateField: any,
) => User.findByIdAndUpdate(userId, updateField, { new: true });

export default class UserControllers {
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
    const { about, name, avatar } = req.body;
    User.create({
      about,
      avatar,
      name,
    }).then((user) => res.status(201).send(user))
      .catch(next);
  };

  static patchUser = (req: Request, res: Response, next: NextFunction) => {
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
