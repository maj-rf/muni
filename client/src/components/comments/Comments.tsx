import { CommentForm } from './CommentForm';
import { CommentList } from './CommentList';

export const Comments = ({ id }: { id: string }) => {
  return (
    <div className="rounded-lg overflow-hidden">
      <CommentForm id={id} />
      <CommentList id={id} />
    </div>
  );
};
