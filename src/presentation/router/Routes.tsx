import { createBrowserRouter, Navigate } from "react-router-dom";
import { ForgotPassword, Login, Register, ResetPassword } from '../pages/auth';
import { Chat } from "../pages/chat";
import { PrivateAcces } from "../pages/auth/PrivateAcces";
import { ReactElement } from "react";


interface Route {
  path: string;
  element: ReactElement;
}

const authRoutes:Route[] = [
  {
    path: 'login/',
    element: <Login/>,
  },
  {
    path: 'register/',
    element: <Register/>,
  },
  {
    path: 'reset-password/',
    element: <ResetPassword/>,
  },
  {
    path: 'forgot-password/',
    element: <ForgotPassword/>,
  },
  {
    path: '/auth/*',
    element: <Navigate to='/auth/login'/>
  }
];


export const Routes = createBrowserRouter([
  {
    path: '/',
    element: <Chat/>,
  },
  {
    path: '/',
    element: <PrivateAcces/>,
    children: [
      {
        path: 'auth/',
        children: authRoutes,
      },
      {
        path: 'chat/:serverId',
        element: <h1>Hello World</h1>
      }
    ]
  },
  {
    path: '/*',
    element: <Navigate to='/'/>
  }
]);
