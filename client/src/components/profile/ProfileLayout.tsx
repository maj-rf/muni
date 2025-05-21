import { authClient } from '@/lib/auth-client';
import { Loading } from '../common/Loading';
import { Navigate, Outlet } from 'react-router';

export const ProfileLayout = () => {
  const { data: session, isPending } = authClient.useSession();
  if (isPending)
    return (
      <div className="h-[calc(100dvh-60px)] flex items-center justify-center">
        <Loading />
      </div>
    );
  if (!session) return <Navigate to="/" />;
  return (
    <div>
      <Outlet />
    </div>
  );
};
