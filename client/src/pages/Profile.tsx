import { Loading } from '@/components/common/Loading';
import { authClient } from '@/lib/auth-client';

export const Profile = () => {
  const { data, isPending } = authClient.useSession();

  if (isPending) return <Loading />;

  return <div>Hello, {data?.user.name}</div>;
};
