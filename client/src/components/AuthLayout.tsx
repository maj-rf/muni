import { authClient } from '@/lib/auth-client';
import { Navigate, Outlet } from 'react-router';
import { Loading } from './common/Loading';
export const AuthLayout = () => {
  const { data, isPending } = authClient.useSession();

  if (isPending)
    return (
      <section className="h-screen flex items-center justify-center">
        <Loading />
      </section>
    );
  if (data?.session) {
    return <Navigate to="/" />;
  }
  return (
    <section className="h-screen">
      <div className="flex flex-col items-center justify-center mx-auto h-full">
        <div className="w-full max-w-md px-2">
          <Outlet />
        </div>
      </div>
    </section>
  );
};
