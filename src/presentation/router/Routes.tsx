import { createBrowserRouter, Navigate } from "react-router-dom";
import { ForgotPassword, Login, Register, ResetPassword } from '../pages/auth';
import { Chat } from "../pages/chat";
import { PrivateAcces } from "../pages/auth/PrivateAcces";




export const Routes = createBrowserRouter([
  {
    path: '/',
    element: <Chat/>,
  },
  {
    path: 'auth/',
    element: <PrivateAcces/>,
    children: [
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
    ]
  },
  {
    path: '/*',
    element: <Navigate to='/'/>
  }
]);
