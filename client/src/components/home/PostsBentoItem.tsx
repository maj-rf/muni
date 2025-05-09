import { cn } from '@/lib/utils';

type BentoItem = {
  variant: 'small' | 'big';
  title: string;
  content: string;
};

export const PostsBentoItem = ({ variant, title, content }: BentoItem) => {
  return (
    <div
      className={cn('bg-slate-500 rounded-md overflow-hidden', {
        'lg:col-span-4 lg:row-span-4': variant === 'big',
        'lg:col-span-3 lg:row-span-2': variant === 'small',
      })}
    >
      <img
        src="https://images.unsplash.com/photo-1618245318763-a15156d6b23c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
        alt={title + 'image'}
        className={cn('object-cover aspect-[5/3]', {
          'lg:aspect-auto': variant === 'small',
          'lg:aspect-[1/1.20]': variant === 'big',
        })}
      />
      <div className="p-4">
        <h2 className="font-semibold text-lg text-center truncate">{title}</h2>
        <p className="text-sm line-clamp-2">{content}</p>
      </div>
    </div>
  );
};
