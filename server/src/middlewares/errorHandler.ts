import { type ErrorRequestHandler, type Request, type Response, type NextFunction } from 'express';
import { isHttpError } from 'http-errors';
import { DatabaseError } from 'pg';

const handleDatabaseError = (err: DatabaseError) => {
  switch (err.code) {
    case '22P02':
      return {
        status: 400,
        message: `Malformatted params: ${err.file}`,
      };
    case '23503':
      return {
        status: 400,
        message: `Related resource not found. Cannot modify: ${err.message}`,
      };
    default:
      // handling all other errors
      return { status: 500, message: `Something went wrong: ${err.message}` };
  }
};

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
  if (error instanceof DatabaseError) {
    const { status: dbStatus, message: dbMessage } = handleDatabaseError(error);
    status = dbStatus;
    errorMessage = dbMessage;
  }
  res.status(status).json({ message: errorMessage });
  next();
};
