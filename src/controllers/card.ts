import { NextFunction, Request, Response } from 'express';
import Card from '../models/card';
import { IAuthRequest } from '../types';
import NotFoundError from '../helpers/notFoundError';
import errorMessages from '../constans/errorMessages';

export default class CardControllers {
  static getAllCard = (req: Request, res: Response, next: NextFunction) => {
    Card.find({})
      .then((cards) => res.send(cards))
      .catch(next);
  };

  static createCard = (req: IAuthRequest, res: Response, next: NextFunction) => {
    const { user } = req;
    const { name, link } = req.body;
    Card.create({
      name,
      link,
      owner: user?._id,
    }).then((cardData) => res.status(201).send(cardData)).catch(next);
  };

  static deleteCard = (req: IAuthRequest, res: Response, next: NextFunction) => {
    const { cardId } = req.params;
    Card.exists({ _id: cardId }).then((result) => {
      if (!result) {
        return Promise.reject(new NotFoundError(errorMessages.cardNotFound));
      }
      return Card.findByIdAndDelete(cardId);
    }).then(() => res.status(200).send({ status: 'OK' })).catch(next);
  };

  static likeCard = (req: IAuthRequest, res: Response, next: NextFunction) => {
    const { user, params } = req;
    Card.exists({ _id: params.cardId }).then((result) => {
      if (!result) {
        throw new NotFoundError('Карточка с указанным _id не найдена.');
      }
      Card.findByIdAndUpdate(params.cardId, { $addToSet: { likes: user?._id } }, { new: true })
        .then((card) => res.send(card));
    }).catch(next);
  };

  static dislikeCard = (req: IAuthRequest, res: Response, next: NextFunction) => {
    const { user, params: { cardId } } = req;
    Card.exists({ _id: cardId }).then((result) => {
      if (!result) {
        throw new NotFoundError('Передан несуществующий _id карточки');
      }
      Card.findByIdAndUpdate(cardId, { $pull: { likes: user?._id } }, { new: true })
        .then((card) => res.send(card));
    }).catch(next);
  };
}
