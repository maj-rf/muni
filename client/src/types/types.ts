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
