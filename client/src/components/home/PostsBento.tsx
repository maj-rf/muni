import { PostsBentoItem } from './PostsBentoItem';
import posts from '../posts/posts.json';

export const PostsBento = () => {
  return (
    <div className="flex items-center justify-center p-4">
      <div className="grid grid-cols-1 lg:grid-cols-10 lg:auto-rows-fr gap-6">
        <PostsBentoItem variant="small" post={posts[0]} />
        <PostsBentoItem variant="big" post={posts[1]} />
        <PostsBentoItem variant="small" post={posts[2]} />
        <PostsBentoItem variant="small" post={posts[3]} />
        <PostsBentoItem variant="small" post={posts[4]} />
      </div>
    </div>
  );
};
