import * as commentController from '../controllers/commentController.js';
import express from 'express';
import { checkAuth } from '../middlewares/checkAuth.js';
import { validateBody } from '../middlewares/validation.js';

export const commentRouter = express.Router();
const checkAuthAndValidateCommentBody = [checkAuth, validateBody(commentController.CommentSchema)];

commentRouter.get('/:slug', commentController.getPostComments);
commentRouter.post('/:slug', checkAuthAndValidateCommentBody, commentController.createNewComment);
commentRouter.delete('/:slug/:commentId', checkAuth, commentController.deleteComment);
