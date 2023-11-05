import mongoose, { Schema } from 'mongoose';
import { celebrate } from 'celebrate';
import Joi from 'joi';
import bcrypt from 'bcryptjs';
import errorMessages from '../constans/errorMessages';
import regexp from '../helpers/regexp';
import NotFoundError from '../helpers/notFoundError';

export interface IUser {
  email: string,
  password: string,
  name: string,
  about: string,
  avatar: string
}

interface UserModel extends mongoose.Model<IUser> {
  findUserByCredentials: (email: string, password: string) =>
    Promise<mongoose.Document<unknown, any, unknown>>
}

const defaultUser: Omit<IUser, 'password' | 'email'> = {
  name: 'Жак-Ив Кусто',
  about: 'Исследователь',
  avatar: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
};

const userSchema = new mongoose.Schema<IUser, UserModel>({
  email: {
    type: Schema.Types.String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: defaultUser.name,
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 200,
    default: defaultUser.about,
  },
  avatar: {
    type: String,
    default: defaultUser.avatar,
    validate: {
      validator: (v: string) => regexp.urlPattern.test(v),
      message: ({ value }) => `${value}: ${errorMessages.invalidUrl}`,
    },
  },
}, { versionKey: false });

userSchema.static('findUserByCredentials', function (email: string, password: string) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь или пароль не верный');
      }
      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          throw new NotFoundError('Пользователь или пароль не верный');
        }
        return user;
      });
    });
});

const User = mongoose.model<IUser, UserModel>('user', userSchema);

export default User;

export class UserValidationRule {
  static createUser = celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email().message(errorMessages.invalidEmail),
      password: Joi.string().required(),
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(200),
      avatar: Joi.string().regex(regexp.urlPattern).message(errorMessages.invalidUrl),
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
