import { eq } from 'drizzle-orm';
import { db } from './index.js';
import { post } from './schema.js';
import type { TPost } from '../types/types.js';

export async function findAuthorPosts(userId: string) {
  return await db.select().from(post).where(eq(post.userId, userId));
}

export async function insertNewPost(
  userId: string,
  obj: Pick<TPost, 'title' | 'slug' | 'imgUrl' | 'content'>,
) {
  return await db.insert(post).values({
    title: obj.title,
    slug: obj.slug,
    imgUrl: obj.imgUrl,
    content: obj.content,
    userId,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
}
