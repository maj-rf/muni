export type TPost = {
  id: string;
  title: string;
  slug: string;
  imgUrl: string;
  published: boolean;
  content: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
};

export type TPublicPost = TPost & {
  author: {
    name: string;
  };
};

export type TNewPost = Pick<TPost, 'title' | 'content' | 'userId' | 'imgUrl' | 'published'>;

export type TComment = {
  id: string;
  postId: string;
  content: string;
  userId: string;
  createdAt: Date;
  author: {
    name: string;
  };
};

export type TNewComment = Pick<TComment, 'content'>;
