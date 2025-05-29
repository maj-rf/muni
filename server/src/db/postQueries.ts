import { eq, and, asc } from 'drizzle-orm';
import { db } from './index.js';
import { post } from './schema.js';
import type { TNewPost, TUpdatePost } from '../types/types.js';

export async function findAuthorPosts(userId: string) {
  return await db.select().from(post).where(eq(post.userId, userId));
}

export async function insertNewPost(userId: string, obj: TNewPost) {
  return await db
    .insert(post)
    .values({
      title: obj.title,
      slug: obj.slug,
      imgUrl: obj.imgUrl,
      content: obj.content,
      userId,
      createdAt: new Date(),
      updatedAt: new Date(),
      published: obj.published,
    })
    .returning();
}

export async function findPostBySlug(slug: string) {
  // const result = await db.select().from(post).where(eq(post.slug, slug));
  const result = await db.query.post.findFirst({
    where: eq(post.slug, slug),
    with: {
      author: {
        columns: {
          name: true,
        },
      },
    },
  });
  return result;
}

export async function updatePost(update: TUpdatePost) {
  const result = await db
    .update(post)
    .set({ ...update })
    .where(and(eq(post.id, update.id), eq(post.userId, update.userId)))
    .returning();
  return result[0];
}

// TODO: check for Drizzle errors? malformed ids, etc
export async function deletePost(postId: string, userId: string) {
  return await db.delete(post).where(and(eq(post.id, postId), eq(post.userId, userId)));
}

export async function findRecentPosts() {
  return await db.query.post.findMany({
    where: eq(post.published, true),
    orderBy: [asc(post.createdAt)],
    limit: 5,
    with: {
      author: {
        columns: {
          name: true,
        },
      },
    },
  });
}
