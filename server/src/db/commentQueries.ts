import type { TNewComment } from '../types/types.js';
import { db } from './index.js';
import { comment, user } from './schema.js';
import { eq, and, desc } from 'drizzle-orm';
import { DatabaseError } from 'pg';
export async function insertComment(userId: string, postId: string, obj: TNewComment) {
  try {
    // return await db
    //   .insert(comment)
    //   .values({
    //     content: obj.content,
    //     userId,
    //     postId,
    //     createdAt: new Date(),
    //     updatedAt: new Date(),
    //   })
    //   .returning();
    const result = await db.transaction(async (tx) => {
      // Insert comment
      const [newComment] = await tx
        .insert(comment)
        .values({
          content: obj.content,
          postId,
          userId,
          createdAt: new Date(),
          updatedAt: new Date(),
        })
        .returning();

      // Query author
      const [author] = await tx.select({ name: user.name }).from(user).where(eq(user.id, userId));
      return { ...newComment, author: { name: author?.name } };
    });
    return result;
  } catch (error) {
    if (error instanceof DatabaseError) throw error;
  }
}

export async function findCommentsByPostId(postId: string, page: number) {
  const LIMIT = 20;
  try {
    return await db
      .select({
        id: comment.id,
        postId: comment.postId,
        content: comment.content,
        userId: comment.userId,
        createdAt: comment.createdAt,
        author: {
          name: user.name,
        },
      })
      .from(comment)
      .leftJoin(user, eq(comment.userId, user.id))
      .where(eq(comment.postId, postId))
      .orderBy(desc(comment.createdAt))
      .limit(LIMIT)
      .offset(page * LIMIT);
  } catch (error) {
    if (error instanceof DatabaseError) throw error;
  }
}

export async function deleteComment(commentId: string, userId: string) {
  return await db.delete(comment).where(and(eq(comment.id, commentId), eq(comment.userId, userId)));
}
