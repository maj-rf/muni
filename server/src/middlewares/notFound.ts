import { type Request, type Response, type NextFunction } from 'express';
import createHttpError from 'http-errors';

export const unknownEndpoint = (req: Request, _res: Response, next: NextFunction) => {
  next(createHttpError(404, `Not Found - ${req.originalUrl}`));
};
