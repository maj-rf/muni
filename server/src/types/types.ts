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

export type TPublicPost = TPost & {
  author: {
    name: string;
  };
};

export type TNewPost = Pick<TPost, 'title' | 'content' | 'imgUrl' | 'published' | 'slug'>;
export type TUpdatePost = Omit<TPost, 'createdAt' | 'updatedAt'>;

export type PublicUser = {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
  image?: string | null | undefined | undefined;
};
