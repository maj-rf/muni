import { cn } from '@/lib/utils';
import { TPublicPost } from '@/types/types';
import { Link } from 'react-router';
type BentoItem = {
  variant: 'small' | 'big';
  post: TPublicPost;
};

export const PostsBentoItem = ({ variant, post }: BentoItem) => {
  return (
    <div
      className={cn('group', {
        'lg:col-span-4 lg:row-span-4': variant === 'big',
        'lg:col-span-3 lg:row-span-2': variant === 'small',
      })}
    >
      <Link to={`/posts/${post.slug}`}>
        <div className="overflow-hidden relative">
          <img
            src={post.imgUrl}
            alt={post.title + ' image'}
            className={cn(
              'h-full max-h-[400px] w-[1024px] aspect-square object-cover object-center ease-in-out duration-500 group-hover:scale-115',
              { 'lg:aspect-[5/8] lg:max-h-none': variant === 'big' },
            )}
          />
          <p className="w-full bg-linear-10 from-pink-500 to-white/70 backdrop-blur-sm absolute bottom-0 text-right p-2 text-black text-sm">
            By {post.author.name}
          </p>
        </div>

        <div className="p-2 text-center">
          <h2 className="font-semibold text-center line-clamp-1">{post.title}</h2>
        </div>
      </Link>
    </div>
  );
};
