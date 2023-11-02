import { NextFunction, Response } from 'express';
import { IAuthRequest } from '../types';

const mockAuth = (req:IAuthRequest, res: Response, next: NextFunction) => {
  req.user = { _id: '65414fccf2ed7d30158b96cd' };
  next();
};

export default mockAuth;
