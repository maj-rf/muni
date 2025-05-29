import * as postController from '../controllers/postController.js';
import express from 'express';
import { checkAuth } from '../middlewares/checkAuth.js';
import { validateBody } from '../middlewares/validation.js';

export const postRouter = express.Router();

postRouter.get('/recent', postController.getRecentPosts);
postRouter.get('/random', postController.getRandomPost);
postRouter.get('/profile', checkAuth, postController.getUserPosts);
postRouter.get('/profile/:slug', postController.getPostBySlug);
postRouter.patch(
  '/profile/:id',
  checkAuth,
  validateBody(postController.PostSchema),
  postController.updateUserPost,
);
postRouter.delete('/profile/:id', checkAuth, postController.deleteUserPost);
postRouter.post(
  '/create',
  checkAuth,
  validateBody(postController.PostSchema),
  postController.createNewUserPost,
);
