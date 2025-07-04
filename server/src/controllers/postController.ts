import type { Request, Response } from 'express';
import z from 'zod';
import * as postQueries from '../db/postQueries.js';
import { generateSlug } from '../lib/generateSlug.js';
import { assertUser, assertPostBody } from '../lib/assertUtils.js';
import createHttpError from 'http-errors';
const DEFAULT_IMG_URL =
  'https://images.unsplash.com/photo-1617575521317-d2974f3b56d2?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

export const PostSchema = z.object({
  body: z.object({
    title: z
      .string()
      .min(8, { message: 'Title must be at least 8 characters' })
      .max(50, { message: 'Title is limited to only 50 characters' }),
    imgUrl: z.string().optional(),
    published: z.boolean().default(false),
    content: z.string().min(5, { message: 'Content must be at least 5 characters' }),
  }),
});

export const getRandomPost = async (_req: Request, res: Response) => {
  const post = await postQueries.findRandomPost();
  res.json(post);
};

export const createNewUserPost = async (req: Request, res: Response) => {
  const user = assertUser(req);
  const { title, imgUrl, content, published } = assertPostBody(req);
  const slug = await generateSlug(title);
  const newPost = await postQueries.insertNewPost(user.id, {
    title,
    imgUrl: !imgUrl ? DEFAULT_IMG_URL : imgUrl.trim(),
    content,
    published,
    slug,
  });
  res.json(newPost);
};

export const getUserPosts = async (req: Request, res: Response) => {
  const user = assertUser(req);
  const posts = await postQueries.findAuthorPosts(user.id);
  res.json(posts);
};

export const getUserSinglePost = async (req: Request, res: Response) => {
  const user = assertUser(req);
  const post = await postQueries.findAuthorPostById(user.id, req.params.id as string);
  if (!post) {
    throw createHttpError(404, "Oh no! You're viewing a post that might've been deleted.");
  }
  res.json(post);
};

export const getPostBySlug = async (req: Request, res: Response) => {
  const post = await postQueries.findPostBySlug(req.params.slug as string);
  if (!post) {
    throw createHttpError(404, "Oh no! You're viewing a post that might've been deleted.");
  }
  res.json(post);
};

export const updateUserPost = async (req: Request, res: Response) => {
  const user = assertUser(req);
  const body = assertPostBody(req);
  const id = req.params.id as string;

  // freeze slug the slug for now
  const post = await postQueries.findAuthorPostById(user.id, id);
  if (!post) {
    throw createHttpError(404, 'Post not found');
  }
  const posts = await postQueries.updatePost({
    ...body,
    imgUrl: !body.imgUrl ? DEFAULT_IMG_URL : body.imgUrl.trim(),
    userId: user.id,
    id,
  });
  res.json(posts);
};

// deletePost
export const deleteUserPost = async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const user = assertUser(req);
  await postQueries.deletePost(id, user.id);
  res.status(204).json({ message: 'Post deleted!' });
};

export const getRecentPosts = async (_req: Request, res: Response) => {
  const posts = await postQueries.findRecentPosts();
  res.json(posts);
};
