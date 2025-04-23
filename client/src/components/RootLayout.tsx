import { Outlet } from 'react-router';
import { Navbar } from './Navbar';
import { Button } from './ui/button';
import { useState } from 'react';
export const RootLayout = () => {
  const [count, setCount] = useState(0);

  return (
    <>
      <Navbar />
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
