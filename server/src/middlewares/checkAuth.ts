import createHttpError from 'http-errors';
import { fromNodeHeaders } from 'better-auth/node';
import type { NextFunction, Request, Response } from 'express';
import { auth } from '../lib/auth.js';

export const checkAuth = async (req: Request, res: Response, next: NextFunction) => {
  const session = await auth.api.getSession({
    headers: fromNodeHeaders(req.headers),
  });
  if (!session) {
    throw createHttpError(401, 'Unauthorized');
  }

  req.user = session.user;
  next();
};
