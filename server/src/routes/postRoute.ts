import {
  getRandomPost,
  createNewUserPost,
  PostSchema,
  getUserPosts,
} from '../controllers/postController.js';
import express from 'express';
import { checkAuth } from '../middlewares/checkAuth.js';
import { validateBody } from '../middlewares/validation.js';

export const postRouter = express.Router();

postRouter.get('/random', getRandomPost);
postRouter.get('/profile', checkAuth, getUserPosts);
postRouter.post('/create', checkAuth, validateBody(PostSchema), createNewUserPost);
