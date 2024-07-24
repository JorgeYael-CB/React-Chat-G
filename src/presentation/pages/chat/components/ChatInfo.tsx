import { NavLink } from "react-router-dom"

export const ChatInfo = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-3xl font-bold text-center mb-4">Inicia sesión para continuar</h2>

      <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
        <NavLink className='inline-block px-6 py-2 bg-blue-500 text-white font-medium rounded-md hover:bg-blue-600 transition-colors' to='/auth/login'>Sign-in</NavLink>
        <NavLink className='inline-block px-6 py-2 bg-gray-200 text-blue-500 font-medium rounded-md hover:bg-gray-300 transition-colors' to='/auth/register'>Create Account</NavLink>
      </div>

      <h1 className="text-2xl font-bold text-center mb-4">¿Qué es <span className="text-green-500">WorldChatHub</span>?</h1>
      <div className="max-w-xl text-center mx-auto">
        <p className="text-lg text-gray-700">
          WorldChatHub es la mejor red social para interactuar y conocer gente de diferentes lugares. Únete a grupos de personas donde podrás tener un chat en tiempo real. 
          Nuestra plataforma te permite conectarte con personas de todo el mundo, compartiendo experiencias y culturas. 
          Ya sea que quieras hacer nuevos amigos, aprender sobre diferentes países, o simplemente pasar un buen rato conversando, WorldChatHub es el lugar perfecto para ti.
          Tendrás control total sobre tus interacciones. 
          ¡Empieza a explorar el mundo desde la comodidad de tu hogar!
        </p>
      </div>
    </div>
  )
}
