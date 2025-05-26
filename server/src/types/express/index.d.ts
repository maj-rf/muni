import type { PublicUser } from '../types.ts';

declare module 'express-serve-static-core' {
  interface Request {
    user?: PublicUser;
  }

  // interface Locals {
  //   fileDetails?: UploadApiResponse;
  // }
}
