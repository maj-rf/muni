import { useGetProfilePosts } from '@/hooks/usePost';
import { Loading } from '../common/Loading';
import { cn, timeSince } from '@/lib/utils';
import { Link } from 'react-router';

export const ProfilePosts = () => {
  const { data, isPending } = useGetProfilePosts();

  if (isPending)
    return (
      <div className="h-full flex justify-center items-center">
        <Loading />
      </div>
    );

  return (
    <div className="p-4">
      <div>Your Posts</div>
      <ul>
        {data?.map((post) => (
          <li key={post.id}>
            <Link to={`/posts/${post.id}`} className="w-full underline">
              <h2>{post.title}</h2>
            </Link>
            <div className="flex gap-2 items-center">
              <div
                className={cn('rounded bg-red-300 dark:bg-red-400 px-2 py-1', {
                  'bg-green-300 dark:bg-emerald-700': post.published,
                })}
              >
                {post.published ? 'Published' : 'Draft'}
              </div>
              <p className="text-muted-foreground">{timeSince(new Date(post.createdAt))} ago</p>
              <Link to={`/profile/edit/${post.slug}`}>Edit</Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
