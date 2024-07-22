import { NavLink } from "react-router-dom"

export const NavBar = () => {
  return (
    <div className="bg-black py-4 px-2 flex justify-around">
      <nav className="flex gap-4">
        <NavLink className='text-gray-200 hover:text-white transition-colors text-base font-medium' to={'/auth/login'}>Sign In</NavLink>
        <NavLink className='text-gray-200 hover:text-white transition-colors text-base font-medium' to={'/auth/register'}>Register</NavLink>
      </nav>
    </div>
  )
}
