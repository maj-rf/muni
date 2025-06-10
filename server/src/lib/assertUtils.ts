import type { Request } from 'express';
import type { PublicUser, TNewComment, TNewPost } from '../types/types.js';
import createHttpError from 'http-errors';

export function assertUser(req: Request): PublicUser {
  const user = req.user as PublicUser | undefined;
  if (!user) {
    throw createHttpError(401, 'Unauthenticated');
  }
  return user;
}

export function assertPostBody(req: Request): TNewPost {
  const { title, imgUrl, content, published, slug } = req.body;
  return { title, imgUrl, content, published, slug };
}

export function assertCommentBody(req: Request): TNewComment {
  const { content } = req.body;
  return { content };
}
