import { createBrowserRouter } from "react-router-dom";
import { ForgotPassword, Login, Register, ResetPassword } from '../pages/auth';




export const Routes = createBrowserRouter([
  {
    path: 'auth/',
    // TODO: Proteccion de rutas
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
    ]
  }
])
