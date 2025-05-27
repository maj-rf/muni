import { useGetProfilePosts } from '@/hooks/usePost';
import { Loading } from '../common/Loading';
import { cn, timeSince } from '@/lib/utils';
import { Link } from 'react-router';
import { DeletePostAlert } from './DeletePostAlert';

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
      <ul className="space-y-2">
        {data?.map((post) => (
          <li key={post.id}>
            <Link
              to={`/posts/${post.id}`}
              className="w-full underline decoration-amber-400 dark:decoration-indigo-300 underline-offset-2"
            >
              <h2>{post.title}</h2>
            </Link>
            <div className="mt-1 flex gap-2 items-center">
              <div
                className={cn(
                  'rounded bg-red-200 text-red-800 dark:bg-red-800 dark:text-red-300 px-2 py-1',
                  {
                    'bg-green-200 text-green-800 dark:bg-emerald-700 dark:text-emerald-300':
                      post.published,
                  },
                )}
              >
                {post.published ? 'Published' : 'Draft'}
              </div>
              <p className="text-muted-foreground">{timeSince(new Date(post.createdAt))} ago</p>
              <Link to={`/profile/edit/${post.slug}`}>Edit</Link>
              <DeletePostAlert postId={post.id} title={post.title} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
