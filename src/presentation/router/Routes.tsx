import { createBrowserRouter, Navigate } from "react-router-dom";
import { ForgotPassword, IsUserLogged, Login, Register, ResetPassword } from '../pages/auth';
import { Home } from "../pages/home";
import { PrivateAcces } from "../pages/auth/PrivateAcces";
import { ReactElement } from "react";
import { Chat } from "../pages/chat";


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
    element: <Home/>,
  },
  {
    path: 'chat/',
    element: <IsUserLogged/>,
    children: [
      {
        path: ':serverId',
        element: <Chat/>
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
