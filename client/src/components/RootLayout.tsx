import { Navigate, Outlet } from 'react-router';
import { Navbar } from './Navbar';
import { Button } from './ui/button';
import { useState } from 'react';
import { authClient } from '@/lib/auth-client';
import { Loading } from './common/Loading';
export const RootLayout = () => {
  const { data, isPending } = authClient.useSession();
  const [count, setCount] = useState(0);
  if (isPending)
    return (
      <div className="h-screen flex items-center justify-center">
        <Loading />
      </div>
    );
  if (!data?.session) return <Navigate to="/auth" />;
  return (
    <>
      <Navbar user={data.user} />
      <div>
        <h1>Vite + React</h1>
        <div className="card">
          <Button onClick={() => setCount((count) => count + 1)}>count is {count}</Button>
          <p>
            Edit <code>src/App.tsx</code> and save to test HMR
          </p>
        </div>
        <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
      </div>
      <main>
        <Outlet />
      </main>
    </>
  );
};
