import { RouteObject } from 'react-router';
import { RootLayout } from './components/RootLayout';
import { AuthLayout } from './components/AuthLayout';
import { Register } from './pages/Register';
import { Login } from './pages/Login';
import { Home } from './pages/Home';
import { Post } from './pages/Post';
import { RandomPost } from './components/posts/RandomPost';
import { Editor } from './components/profile/Editor';

export const routesConfig: RouteObject[] = [
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: '/profile',
        element: <Editor />,
      },
      {
        path: '/posts/random',
        element: <RandomPost />,
      },
      {
        path: '/posts/:id',
        element: <Post />,
      },
    ],
  },
  {
    path: '/auth',
    element: <AuthLayout />,
    children: [
      {
        path: '/auth/register',
        element: <Register />,
      },
      {
        index: true,
        element: <Login />,
      },
    ],
  },
];
