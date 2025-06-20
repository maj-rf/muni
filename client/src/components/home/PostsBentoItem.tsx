import { cn } from '@/lib/utils';
import { TPublicPost } from '@/types/types';
import { Link } from 'react-router';
type BentoItem = {
  variant: 'small' | 'big';
  post: TPublicPost;
};

export const PostsBentoItem = ({ variant, post }: BentoItem) => {
  return (
    <Link
      to={`/posts/${post.slug}`}
      className={cn('relative overflow-hidden group', {
        'lg:col-span-4 lg:row-span-2': variant === 'big',
        'lg:col-span-3 lg:row-span-1': variant === 'small',
      })}
    >
      <img
        src={post.imgUrl}
        alt={post.title + ' image'}
        className="w-full h-full object-cover object-center ease-in-out duration-500 group-hover:scale-115"
      />
      <div className="w-full bg-linear-20 from-primary to-white/80 backdrop-blur-sm absolute bottom-0 text-right p-2 text-black text-sm">
        <p className="line-clamp-1">{post.title}</p>
        <p>By {post.author.name}</p>
      </div>
    </Link>
  );
};
