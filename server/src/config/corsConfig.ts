import { type CorsOptions } from 'cors';

export const ALLOWED_ORIGINS = ['http://localhost:5174', process.env.CLIENT_URL!];

export const corsOptions: CorsOptions = {
  origin: ALLOWED_ORIGINS,
  credentials: true,
};
