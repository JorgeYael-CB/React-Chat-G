import { Navigate, Outlet } from "react-router-dom";
import { store } from "../../store"

export const PrivateAcces = () => {
  const { isLogged } = store();



  return (
    <>
      {
        isLogged
        ? <Navigate to='/'/>
        : <Outlet/>
      }
    </>
  )
}
