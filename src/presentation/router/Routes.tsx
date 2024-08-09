import { createBrowserRouter, Navigate } from "react-router-dom";
import { ForgotPassword, IsUserLogged, Login, Register, ResetPassword } from '../pages/auth';
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
    path: 'chat/',
    element: <IsUserLogged/>,
    children: [
      {
        path: ':serverId',
        element: <h1>Hello World</h1>
      }
    ]
  },
  {
    path: '/auth',
    element: <PrivateAcces/>,
    children: authRoutes,
  },
  {
    path: '/*',
    element: <Navigate to='/'/>
  }
]);
