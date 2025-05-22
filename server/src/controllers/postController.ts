import type { Request, Response } from 'express';
import z from 'zod';
import createHttpError from 'http-errors';
import { findAuthorPosts, insertNewPost } from '../db/postQueries.js';
import type { PublicUser, TNewPost } from '../types/types.js';
import { generateSlug } from '../lib/generateSlug.js';

const DEFAULT_IMG_URL =
  'https://images.unsplash.com/photo-1617575521317-d2974f3b56d2?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

function assertUser(req: Request): PublicUser {
  const user = req.user as PublicUser | undefined;
  if (!user) {
    throw createHttpError(401, 'Unauthenticated');
  }
  return user;
}

function assertPostBody(req: Request): Omit<TNewPost, 'slug'> {
  const { title, imgUrl, content, published } = req.body;
  return { title, imgUrl, content, published };
}

export const PostSchema = z.object({
  body: z.object({
    title: z
      .string()
      .min(5, { message: 'Title must be at least 5 characters' })
      .max(50, { message: 'Title is limited to only 50 characters' }),
    imgUrl: z.string().optional(),
    published: z.boolean().default(false),
    content: z.string().min(5, { message: 'Content must be at least 5 characters' }),
  }),
});

export const getRandomPost = (_req: Request, res: Response) => {
  res.json({ title: 'Hello', content: 'Hello World' });
};

export const createNewUserPost = async (req: Request, res: Response) => {
  const user = assertUser(req);
  const { title, imgUrl, content, published } = assertPostBody(req);
  const slug = await generateSlug(title);
  const newPost = await insertNewPost(user.id, {
    title,
    imgUrl: !imgUrl ? DEFAULT_IMG_URL : imgUrl.trim(),
    content,
    published,
    slug,
  });
  res.json(newPost);
};

// getRecentPosts

// getPosts
export const getUserPosts = async (req: Request, res: Response) => {
  const user = assertUser(req);
  const posts = await findAuthorPosts(user.id);
  res.json(posts);
};

// getPost

// updatePost

// deletePost
