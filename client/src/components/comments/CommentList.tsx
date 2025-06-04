import { useGetComments } from '@/hooks/useComment';
import { Loading } from '../common/Loading';
import { TComment } from '@/types/types';
import { AxiosError } from 'axios';

const Comment = ({ comment }: { comment: TComment }) => {
  return (
    <li className="flex flex-col md:flex-row gap-2">
      <div className="w-full">{comment.author.name}</div>
      <p className="">{comment.content}</p>
    </li>
  );
};

export const CommentList = ({ slug }: { slug: string }) => {
  const { data, isPending, error } = useGetComments(slug);

  if (isPending) return <Loading />;
  if (error)
    return <div>{error instanceof AxiosError ? error.response?.data.message : error.message}</div>;

  //TODO: add delete button
  return (
    <div className="p-4 bg-accent">
      {data.length === 0 ? (
        <div>Be the first to comment!</div>
      ) : (
        <ul className="space-y-4">
          {data.map((c) => (
            <Comment key={c.id} comment={c} />
          ))}
        </ul>
      )}
    </div>
  );
};
