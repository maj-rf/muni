import { PostsBentoItem } from './PostsBentoItem';

export const PostsBento = () => {
  return (
    <div className="flex w-full items-center justify-center p-4">
      <div className="grid grid-cols-1 lg:grid-cols-10 lg:grid-rows-4 w-full gap-4">
        <PostsBentoItem
          variant="small"
          title="Life Begins at 42"
          content="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquam, eveniet sapiente ratione voluptatem quo beatae, dolorum asperiores ab, id distinctio dicta excepturi sequi. Culpa? Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquam, eveniet sapiente ratione voluptatem quo beatae, dolorum asperiores ab, id distinctio dicta excepturi sequi. Culpa"
        />

        <PostsBentoItem
          variant="big"
          title="Life Begins at 42"
          content="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquam, eveniet sapiente ratione voluptatem quo beatae, dolorum asperiores ab, id distinctio dicta excepturi sequi. Culpa?"
        />
        <PostsBentoItem
          variant="small"
          title="Life Begins at 42"
          content="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquam, eveniet sapiente ratione voluptatem quo beatae, dolorum asperiores ab, id distinctio dicta excepturi sequi. Culpa?"
        />
        <PostsBentoItem
          variant="small"
          title="Life Begins at 42"
          content="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquam, eveniet sapiente ratione voluptatem quo beatae, dolorum asperiores ab, id distinctio dicta excepturi sequi. Culpa?"
        />
        <PostsBentoItem
          variant="small"
          title="Life Begins at 42"
          content="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquam, eveniet sapiente ratione voluptatem quo beatae, dolorum asperiores ab, id distinctio dicta excepturi sequi. Culpa?"
        />
      </div>
    </div>
  );
};
