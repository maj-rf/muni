import { getRandomPost } from '../controllers/postController.js';
import express from 'express';

export const postRouter = express.Router();

postRouter.get('/random', getRandomPost);
