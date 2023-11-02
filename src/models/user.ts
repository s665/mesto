import mongoose from 'mongoose';
import { celebrate } from 'celebrate';
import Joi from 'joi';
import errorMessages from '../constans/errorMessages';

export interface IUser {
  name: string,
  about: string,
  avatar: string
}

const userSchema = new mongoose.Schema<IUser>({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 200,
    required: true,
  },
  avatar: {
    type: String,
    required: true,
  },
});

export default mongoose.model<IUser>('user', userSchema);

export class UserValidationRule {
  static createUser = celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      about: Joi.string().required().min(2).max(200),
      avatar: Joi.string().required(),
    }),
  }, { messages: { '*': errorMessages.createUserValidation } });

  static getUserById = celebrate({
    params: Joi.object().keys({
      userId: Joi.string().required().hex().length(24),
    }),
  });

  static patchUser = celebrate({
    body: Joi.object().keys({
      about: Joi.string().min(2).max(200),
      name: Joi.string().min(2).max(30),
    }),
  }, { messages: { '*': errorMessages.updateUserValidation } });

  static patchAvatarUser = celebrate({
    body: Joi.object().keys({
      avatar: Joi.string().required(),
    }),
  }, { messages: { '*': errorMessages.updateAvatarUserValidation } });
}
