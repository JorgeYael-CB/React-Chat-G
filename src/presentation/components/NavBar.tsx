
export const NavBar = () => {
  return (
    <div className="flex justify-around py-4">
      <nav className="flex gap-2.5 font-semibold text-base">
        <a className="text-blue-800 hover:text-blue-600 transition-colors" href="#">Login</a>
        <a className="text-blue-800 hover:text-blue-600 transition-colors" href="#">Register</a>
      </nav>
      <nav className="flex gap-3 font-semibold text-base">
        <a className="text-blue-800 hover:text-blue-600 transition-colors" href="#">Pais</a>
        <a className="text-blue-800 hover:text-blue-600 transition-colors" href="#">Servidor</a>
        <a className="text-blue-800 hover:text-blue-600 transition-colors" href="#">AlgoMas</a>
        <a className="text-blue-800 hover:text-blue-600 transition-colors" href="#">enlace</a>
      </nav>
    </div>
  )
}
