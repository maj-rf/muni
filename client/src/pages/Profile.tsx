import { Loading } from '@/components/common/Loading';
import { ProfilePosts } from '@/components/profile/ProfilePosts';
import { authClient } from '@/lib/auth-client';

export const Profile = () => {
  const { data, isPending } = authClient.useSession();

  if (isPending) return <Loading />;

  return (
    <div>
      <h2>Hello, {data?.user.name}</h2>

      <ProfilePosts />
    </div>
  );
};
