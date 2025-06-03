import * as commentController from '../controllers/commentController.js';
import express from 'express';
import { checkAuth } from '../middlewares/checkAuth.js';
import { validateBody } from '../middlewares/validation.js';

export const commentRouter = express.Router();

commentRouter.get('/:postId', commentController.getPostComments);
commentRouter.post(
  '/:postId',
  checkAuth,
  validateBody(commentController.CommentSchema),
  commentController.createNewComment,
);
commentRouter.delete('/:postId/:commentId', checkAuth, commentController.deleteComment);
