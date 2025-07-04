import express, { type Request, type Response } from 'express';
import { errorHandler } from './middlewares/errorHandler.js';
import { unknownEndpoint } from './middlewares/notFound.js';
import { toNodeHandler } from 'better-auth/node';
import { auth } from './lib/auth.js';
import morgan from 'morgan';
import cors from 'cors';
import { corsOptions } from './config/corsConfig.js';
import { postRouter } from './routes/postRoute.js';
import { commentRouter } from './routes/commentRoute.js';

const app = express();
app.disable('x-powered-by').use(morgan('dev')).use(cors(corsOptions));
app.all('/api/auth/{*splat}', toNodeHandler(auth));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, world!');
});

app.use('/api/v1/posts', postRouter);
app.use('/api/v1/comments', commentRouter);

app.use(unknownEndpoint);
app.use(errorHandler);

export default app;
