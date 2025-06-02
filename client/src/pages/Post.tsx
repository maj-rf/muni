import { useParams } from 'react-router';
import { PostSingle } from '@/components/posts/PostSingle';
import { Comments } from '@/components/comments/Comments';

export const Post = () => {
  const params = useParams<{ slug: string }>();

  return (
    <div className="w-full md:max-w-5/6 mx-auto py-4">
      <PostSingle slug={params.slug as string} />
      <Comments id={params.slug as string} />
    </div>
  );
};
