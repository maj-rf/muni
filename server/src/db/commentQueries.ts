import type { TNewComment } from '../types/types.js';
import { db } from './index.js';
import { comment } from './schema.js';
import { eq, and } from 'drizzle-orm';
import { DatabaseError } from 'pg';
export async function insertComment(userId: string, slug: string, obj: TNewComment) {
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
      // Step 1: Find the post by slug
      const foundPost = await tx.query.post.findFirst({
        where: (fields) => eq(fields.slug, slug),
      });

      if (!foundPost) {
        throw new Error(`Post with slug "${slug}" not found.`);
      }

      // Step 2: Insert a new comment for the post
      const [newComment] = await tx
        .insert(comment)
        .values({
          content: obj.content,
          postId: foundPost.id,
          userId,
          createdAt: new Date(),
          updatedAt: new Date(),
        })
        .returning();

      return newComment;
    });
    return result;
  } catch (error) {
    if (error instanceof DatabaseError) throw error;
  }
}

export async function findCommentsBySlug(slug: string) {
  try {
    const result = await db.transaction(async (tx) => {
      const foundPost = await tx.query.post.findFirst({
        where: (fields) => eq(fields.slug, slug),
      });

      if (!foundPost) {
        throw new Error(`Post with slug "${slug}" not found.`);
      }
      const comments = await tx.query.comment.findMany({
        where: (fields) => eq(fields.postId, foundPost.id),
        with: {
          author: {
            columns: {
              name: true,
            },
          },
        },
      });

      return comments;
    });
    return result;
  } catch (error) {
    if (error instanceof DatabaseError) throw error;
  }

  // try {
  //   return await db
  //     .select({
  //       id: comment.id,
  //       postId: comment.postId,
  //       content: comment.content,
  //       userId: comment.userId,
  //       createdAt: comment.createdAt,
  //       author: {
  //         name: user.name,
  //       },
  //     })
  //     .from(comment)
  //     .leftJoin(user, eq(comment.userId, user.id))
  //     .where(eq(comment.postId, postId));
  // } catch (error) {
  //   if (error instanceof DatabaseError) throw error;
  // }
}

export async function deleteComment(commentId: string, userId: string) {
  return await db.delete(comment).where(and(eq(comment.id, commentId), eq(comment.userId, userId)));
}
