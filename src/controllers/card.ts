import { NextFunction, Request, Response } from 'express';
import { UpdateQuery } from 'mongoose';
import Card, { ICard } from '../models/card';
import NotFoundError from '../helpers/notFoundError';
import errorMessages from '../constans/errorMessages';

const updateLike = (
  cardId: string,
  userId: string,
  updateType: 'like' | 'dislike',
) => {
  const updateQuery: UpdateQuery<ICard> = updateType === 'like'
    ? { $addToSet: { likes: userId } }
    : { $pull: { likes: userId } };
  return Card.findByIdAndUpdate(cardId, updateQuery, { new: true });
};

export default class CardControllers {
  static getAllCard = (req: Request, res: Response, next: NextFunction) => {
    Card.find({})
      .then((cards) => res.send(cards))
      .catch(next);
  };

  static createCard = (req: Request, res: Response, next: NextFunction) => {
    const { user } = req;
    const { name, link } = req.body;
    Card.create({
      name,
      link,
      owner: user?._id,
    }).then((cardData) => res.status(201).send(cardData)).catch(next);
  };

  static deleteCard = (req: Request, res: Response, next: NextFunction) => {
    const { cardId } = req.params;
    Card.findByIdAndDelete(cardId)
      .then((card) => {
        if (!card) {
          throw new NotFoundError(errorMessages.cardNotFound);
        }
      })
      .then(() => res.status(200).send({ status: 'OK' }))
      .catch(next);
  };

  static likeCard = (req: Request, res: Response, next: NextFunction) => {
    const { user, params } = req;
    updateLike(params.cardId, user._id, 'like')
      .then((card) => {
        if (!card) {
          throw new NotFoundError(errorMessages.likeCardValidation);
        }
        res.send(card);
      })
      .catch(next);
  };

  static dislikeCard = (req: Request, res: Response, next: NextFunction) => {
    const { user, params: { cardId } } = req;
    updateLike(cardId, user._id, 'dislike')
      .then((card) => {
        if (!card) {
          throw new NotFoundError(errorMessages.likeCardValidation);
        }
        res.send(card);
      })
      .catch(next);
  };
}
