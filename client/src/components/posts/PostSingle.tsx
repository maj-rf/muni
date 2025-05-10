import posts from './posts.json';

export const PostSingle = ({ id }: { id: string }) => {
  const post = posts[Number(id) - 1];
  return (
    <>
      <h1 className="text-lg font-bold">{post.title}</h1>
      <p className="text-muted-foreground">by: {post.author}</p>
      <img
        className="w-full max-h-[600px] object-cover"
        src="https://images.unsplash.com/photo-1618245318763-a15156d6b23c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
      />
      <div className="p-4">{post.content}</div>
    </>
  );
};
