import type { Request, Response } from 'express';
import z from 'zod';
import { assertCommentBody, assertUser } from '../lib/assertUtils.js';
import * as commentQueries from '../db/commentQueries.js';

export const CommentSchema = z.object({
  body: z.object({
    content: z
      .string()
      .min(5, { message: 'Comment must be at least 5 characters' })
      .max(300, { message: 'Comment is limited to only 300 characters' }),
  }),
});

// new
export const createNewComment = async (req: Request, res: Response) => {
  const postId = req.params.postId as string;
  const { content } = assertCommentBody(req);
  console.log(content);
  const user = assertUser(req);
  const comment = await commentQueries.insertComment(user.id, postId, { content });
  res.json(comment);
};

// findAll
export const getPostComments = async (req: Request, res: Response) => {
  const postId = req.params.postId as string;
  const comments = await commentQueries.findCommentsByPostId(postId);
  res.json(comments);
};

// delete
export const deleteComment = async (req: Request, res: Response) => {
  const commentId = req.params.commentId as string;
  const user = assertUser(req);
  await commentQueries.deleteComment(commentId, user.id);
  res.json({ message: 'Comment deleted!' });
};
