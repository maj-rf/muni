export type TPost = {
  id: string;
  title: string;
  slug: string;
  imgUrl: string | null;
  content: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
};

export type PublicUser = {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
  image?: string | null | undefined | undefined;
};
