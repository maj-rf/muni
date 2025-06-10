import { timeSince } from '@/lib/utils';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { TPublicPost } from '@/types/types';

const PostMarkdown = ({ markdown }: { markdown: string }) => {
  return (
    <Markdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
      {markdown}
    </Markdown>
  );
};

export const PostSingle = ({ post }: { post: TPublicPost }) => {
  return (
    <section>
      <div className="max-w-[768px] mx-auto">
        <div className="text-center mb-4">
          <div className="text-lg font-bold">{post.title}</div>
          <div>
            by {post.author.name} |{' '}
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
