import { CommentForm } from './CommentForm';

export const Comments = ({ id }: { id: string }) => {
  return (
    <div>
      <CommentForm id={id} />

      <div>Comments for {id}</div>
    </div>
  );
};
