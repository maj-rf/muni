import { authClient } from '@/lib/auth-client';
import { Loading } from '../common/Loading';
import { Navigate, Outlet } from 'react-router';
import { ProfileSidebar } from './ProfileSidebar';

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
    <div className="h-[calc(100dvh-60px)]">
      <div className="grid grid-cols-[auto_minmax(0,_1fr)] h-full">
        <ProfileSidebar />
        <div className="px-4 py-2 w-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
