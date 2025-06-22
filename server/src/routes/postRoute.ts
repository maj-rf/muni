import * as postController from '../controllers/postController.js';
import express from 'express';
import { checkAuth } from '../middlewares/checkAuth.js';
import { validateBody } from '../middlewares/validation.js';

export const postRouter = express.Router();
const checkAuthAndValidateBody = [checkAuth, validateBody(postController.PostSchema)];

postRouter.get('/recent', postController.getRecentPosts);
postRouter.get('/random', postController.getRandomPost);
postRouter.get('/profile', checkAuth, postController.getUserPosts);
postRouter.get('/profile/:id', checkAuth, postController.getUserSinglePost);

postRouter.get('/:slug', postController.getPostBySlug);
postRouter.patch('/:id', checkAuthAndValidateBody, postController.updateUserPost);
postRouter.delete('/:id', checkAuth, postController.deleteUserPost);
postRouter.post('/', checkAuthAndValidateBody, postController.createNewUserPost);
