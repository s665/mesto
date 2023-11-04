import { NextFunction, Response, Request } from 'express';

const mockAuth = (req: Request, res: Response, next: NextFunction) => {
  req.user = { _id: '65414fccf2ed7d30158b96cd' };
  next();
};

export default mockAuth;
