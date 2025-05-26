import { type ErrorRequestHandler, type Request, type Response, type NextFunction } from 'express';
import { isHttpError } from 'http-errors';

export const errorHandler: ErrorRequestHandler = (
  error: unknown,
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.error(error);
  let errorMessage = 'An unknown error has occurred';
  let status = 500;
  if (isHttpError(error)) {
    status = error.status;
    errorMessage = error.message;
  }
  res.status(status).json({ message: errorMessage });
  next();
};
