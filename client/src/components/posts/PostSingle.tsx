import posts from './posts.json';

export const PostSingle = ({ id }: { id: string }) => {
  const post = posts[Number(id) - 1];
  return (
    <>
      <h1 className="text-lg font-bold">{post.title}</h1>
      <p className="text-muted-foreground">by: {post.author}</p>
      <img className="w-full max-h-[600px] object-cover" src={post.img} />
      <div className="p-4">{post.content}</div>
    </>
  );
};
