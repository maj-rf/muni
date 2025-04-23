import express from 'express';
import { errorHandler } from './middlewares/errorHandler.js';
import { unknownEndpoint } from './middlewares/notFound.js';

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(errorHandler);
app.use(unknownEndpoint);

export default app;
