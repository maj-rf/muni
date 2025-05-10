import { cn } from '@/lib/utils';
import { Link } from 'react-router';
type BentoItem = {
  variant: 'small' | 'big';
  post: {
    title: string;
    content: string;
    id: number;
  };
};

export const PostsBentoItem = ({ variant, post }: BentoItem) => {
  return (
    <div
      className={cn('bg-slate-500 rounded-md overflow-hidden', {
        'lg:col-span-4 lg:row-span-4': variant === 'big',
        'lg:col-span-3 lg:row-span-2': variant === 'small',
      })}
    >
      <Link to={`/posts/${post.id}`}>
        <img
          src="https://images.unsplash.com/photo-1618245318763-a15156d6b23c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
          alt={post.title + 'image'}
          className={cn('object-cover aspect-[5/3]', {
            'lg:aspect-auto': variant === 'small',
            'lg:aspect-[1/1.20]': variant === 'big',
          })}
        />
        <div className="p-4">
          <h2 className="font-semibold text-lg text-center truncate">{post.title}</h2>
          <p className="text-sm line-clamp-2">{post.content}</p>
        </div>
      </Link>
    </div>
  );
};
