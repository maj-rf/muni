import { type CorsOptions } from 'cors';

export const ALLOWED_ORIGINS = ['http://localhost:5176', process.env.CLIENT_URL!];

export const corsOptions: CorsOptions = {
  origin: ALLOWED_ORIGINS,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  credentials: true,
};
