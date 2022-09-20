import { NextFunction, Request, Response } from 'express';

import { CustomError } from '../utils/custom.error';

export const errorHandler = (err: CustomError, req: Request, res: Response, next: NextFunction) => {
  return res.status(err.HttpStatusCode).json(err.JSON);
};
