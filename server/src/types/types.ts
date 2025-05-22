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

export type TNewPost = Pick<TPost, 'title' | 'content' | 'imgUrl' | 'published' | 'slug'>;

export type PublicUser = {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
  image?: string | null | undefined | undefined;
};
