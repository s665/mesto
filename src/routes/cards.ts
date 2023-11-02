import { Router } from 'express';
import CardControllers from '../controllers/card';
import { CardValidationRule } from '../models/card';

const cards = Router();

cards.get('', CardControllers.getAllCard);
cards.post('', CardValidationRule.createCard, CardControllers.createCard);
cards.delete('/:cardId', CardValidationRule.deleteCard, CardControllers.deleteCard);
cards.put('/:cardId/like', CardValidationRule.likeCard, CardControllers.likeCard);
cards.delete('/:cardId/like', CardValidationRule.likeCard, CardControllers.dislikeCard);

export default cards;
