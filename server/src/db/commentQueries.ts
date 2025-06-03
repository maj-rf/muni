import type { TNewComment } from '../types/types.js';
import { db } from './index.js';
import { comment, user } from './schema.js';
import { eq, and } from 'drizzle-orm';
import { DatabaseError } from 'pg';
export async function insertComment(userId: string, postId: string, obj: TNewComment) {
  try {
    return await db
      .insert(comment)
      .values({
        content: obj.content,
        userId,
        postId,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .returning();
  } catch (error) {
    if (error instanceof DatabaseError) throw error;
  }
}

export async function findCommentsByPostId(postId: string) {
  // return await db.query.comment.findMany({
  //   where: eq(comment.postId, postId),
  //   with: {
  //     author: {
  //       columns: {
  //         name: true,
  //       },
  //     },
  //   },
  // });
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
    .where(eq(comment.postId, postId));
}

export async function deleteComment(commentId: string, userId: string) {
  return await db.delete(comment).where(and(eq(comment.id, commentId), eq(comment.userId, userId)));
}
