import { PostMarkdown } from '@/components/posts/PostMarkdown';
import { useLocation } from 'react-router';
import { timeSince } from '@/lib/utils';

export const ProfilePreviewPost = () => {
  const location = useLocation();
  const { post } = location.state;

  // TODO: add scroll to top
  return (
    <section className="relative">
      <div className="max-w-[768px] mx-auto">
        <div className="text-center mb-4">
          <div className="text-lg font-bold">{post.title}</div>
          <div>
            {post.author && `by ${post.author.name} | `}
            <span className="text-muted-foreground">{timeSince(new Date(post.createdAt))} ago</span>
          </div>
        </div>

        <picture>
          <source srcSet={post.imgUrl} />
          <img
            src="https://images.unsplash.com/photo-1747747004644-4ab29224deee?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            className="w-full max-h-[300px] object-cover aspect-video"
          />
        </picture>

        <div className="w-full mx-auto p-4 prose lg:prose-lg">
          <PostMarkdown markdown={post.content} />
        </div>
        <div className="px-4 my-2 flex justify-end w-full text-sm text-muted-foreground">
          Last Updated on {new Date(post.updatedAt).toLocaleDateString()}
        </div>
      </div>
    </section>
  );
};
