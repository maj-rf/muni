import comments from '../comments/comments.json';

type TComment = {
  postId: number;
  content: string;
  id: number;
  author: string;
};
const Comment = ({ comment }: { comment: TComment }) => {
  return (
    <li className="flex flex-col md:flex-row gap-2">
      <div className="w-full">{comment.author}</div>
      <p className="">{comment.content}</p>
    </li>
  );
};

export const CommentList = ({ id }: { id: string }) => {
  const list = comments.filter((c) => c.postId === Number(id));

  return (
    <div className="p-4 bg-accent">
      {list.length === 0 ? (
        <div>Be the first to comment!</div>
      ) : (
        <ul className="space-y-4">
          {list.map((c) => (
            <Comment key={c.id} comment={c} />
          ))}
        </ul>
      )}
    </div>
  );
};
