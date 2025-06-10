import * as commentController from '../controllers/commentController.js';
import express from 'express';
import { checkAuth } from '../middlewares/checkAuth.js';
import { validateBody } from '../middlewares/validation.js';

export const commentRouter = express.Router();
const checkAuthAndValidateCommentBody = [checkAuth, validateBody(commentController.CommentSchema)];

commentRouter.get('/:postId', commentController.getPostComments);
commentRouter.post('/:postId', checkAuthAndValidateCommentBody, commentController.createNewComment);
commentRouter.delete('/:postId/:commentId', checkAuth, commentController.deleteComment);
