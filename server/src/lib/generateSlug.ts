import slug from 'slug';
import { db } from '../db/index.js';

export async function generateSlug(title: string): Promise<string> {
  const baseSlug = slug(title, { locale: 'en' });
  let uniqueSlug = baseSlug;
  let suffix = 1;

  while (true) {
    const existing = await db.query.post.findFirst({
      where: (fields, { eq }) => eq(fields.slug, uniqueSlug),
    });

    if (!existing) break;

    suffix += 1;
    uniqueSlug = `${baseSlug}-${suffix}`;
  }

  return uniqueSlug;
}
