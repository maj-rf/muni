import { RouteObject } from 'react-router';
import { RootLayout } from './components/RootLayout';
import { AuthLayout } from './components/AuthLayout';
import { Register } from './pages/Register';
import { Login } from './pages/Login';
import { Home } from './pages/Home';
import { Post } from './pages/Post';
import { RandomPost } from './components/posts/RandomPost';
import { ProfileCreatePost } from './pages/ProfileCreatePost';
import { Profile } from './pages/Profile';
import { ProfileLayout } from './components/profile/ProfileLayout';
import { ProfileEditPost } from './pages/ProfileEditPost';

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
        element: <ProfileLayout />,
        children: [
          {
            index: true,
            element: <Profile />,
          },
          {
            path: '/profile/write',
            element: <ProfileCreatePost />,
          },
          {
            path: '/profile/edit/:slug',
            element: <ProfileEditPost />,
          },
        ],
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
