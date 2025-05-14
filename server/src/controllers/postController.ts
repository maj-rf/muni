import type { Request, Response } from 'express';

export const getRandomPost = (_req: Request, res: Response) => {
  res.json({ title: 'Hello', content: 'Hello World' });
};

// getRecentPosts

// getUserPublicPosts

// getPost

// updatePost

// deletePost
