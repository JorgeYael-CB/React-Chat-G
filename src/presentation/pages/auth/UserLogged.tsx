import { Navigate, Outlet } from "react-router-dom";
import { store } from "../../store"

export const IsUserLogged = () => {
  const { isLogged } = store();



  return (
    <>
      {
        isLogged
        ? <Outlet/>
        : <Navigate to='/'/>
      }
    </>
  )
}
