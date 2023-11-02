import Joi from 'joi';
import mongoose, { Schema } from 'mongoose';
import { celebrate } from 'celebrate';
import errorMessages from '../constans/errorMessages';

interface ICard {
  name: string,
  link: string,
  owner: Schema.Types.ObjectId,
  likes: Schema.Types.ObjectId[],
  createdAt: Date
}

const cardSchema = new mongoose.Schema<ICard>({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  owner: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  likes: {
    type: [Schema.Types.ObjectId],
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model<ICard>('card', cardSchema);

export class CardValidationRule {
  static createCard = celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      link: Joi.string().required(),
      owner: Joi.string().required().hex().length(24),
    }),
  }, { messages: { '*': errorMessages.createCardValidation } });

  static deleteCard = celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().required().hex().length(24),
    }),
  }, { messages: { '*': errorMessages.deleteCardValidation } });

  static likeCard = celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().required().hex().length(24),
    }),
  }, { messages: { '*': errorMessages.likeCardValidation } });
}
