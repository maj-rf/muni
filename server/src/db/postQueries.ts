import { eq, and, asc, desc, sql, getTableColumns } from 'drizzle-orm';
import { db } from './index.js';
import { post, user } from './schema.js';
import type { TNewPost, TUpdatePost } from '../types/types.js';

export async function findAuthorPosts(userId: string) {
  return await db.select().from(post).where(eq(post.userId, userId)).orderBy(asc(post.createdAt));
}

export async function findAuthorPostById(userId: string, id: string) {
  const result = await db
    .select({
      ...getTableColumns(post),
      author: {
        name: user.name,
      },
    })
    .from(post)
    .leftJoin(user, eq(post.userId, user.id))
    .where(and(eq(post.id, id), eq(post.userId, userId)))
    .limit(1);
  return result[0];
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

  const result = await db
    .select({
      ...getTableColumns(post),
      author: {
        name: user.name,
      },
    })
    .from(post)
    .leftJoin(user, eq(post.userId, user.id))
    .where(and(eq(post.slug, slug), eq(post.published, true)))
    .limit(1);
  return result[0];
}

export async function updatePost(update: TUpdatePost) {
  const result = await db
    .update(post)
    .set({ ...update, updatedAt: new Date() })
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
    orderBy: [desc(post.createdAt)],
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

export async function findRandomPost() {
  const result = await db
    .select()
    .from(post)
    .where(eq(post.published, true))
    .orderBy(sql`RANDOM()`)
    .limit(1);
  return result[0];
}
