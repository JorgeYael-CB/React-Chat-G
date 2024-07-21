import { createBrowserRouter } from "react-router-dom";
import { Login, Register } from '../pages/auth';




export const Routes = createBrowserRouter([
  {
    path: 'auth/',
    // Proteccion de rutas
    children: [
      {
        path: 'login/',
        element: <Login/>,
      },
      {
        path: 'register/',
        element: <Register/>,
      },
    ]
  }
])
