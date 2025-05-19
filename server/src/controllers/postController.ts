import type { Request, Response } from 'express';
import z from 'zod';
export const getRandomPost = (_req: Request, res: Response) => {
  res.json({ title: 'Hello', content: 'Hello World' });
};

export const PostSchema = z.object({
  body: z.object({
    title: z
      .string()
      .min(5, { message: 'Title must be at least 5 characters' })
      .max(50, { message: 'Title is limited to only 50 characters' }),
    imgUrl: z.string().optional(),
    content: z.string().min(5, { message: 'Content must be at least 5 characters' }),
  }),
});

export const createNewUserPost = (req: Request, res: Response) => {
  res.json('asdaskdasjd');
};

// getRecentPosts

// getUserPublicPosts

// getPost

// updatePost

// deletePost
