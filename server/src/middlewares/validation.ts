import type { NextFunction, Response, Request } from 'express';
import createHttpError from 'http-errors';
import { type AnyZodObject, ZodError } from 'zod';

export function validateBody(schema: AnyZodObject) {
  return (req: Request, _res: Response, next: NextFunction) => {
    try {
      schema.parse({ body: req.body });
      return next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errorMessages = error.errors.map((issue) => issue.message).join(', ');
        return next(createHttpError(400, errorMessages));
      } else {
        return next(error);
      }
    }
  };
}
