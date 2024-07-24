import { useEffect } from "react";
import { store } from "../../store";
import { ChatInfo } from "./components";

export const Chat = () => {
  const { isLogged } = store();



  useEffect(() => {
    // TODO: obtener los datos del usuario y validar que su sesion no haya sido expirada.
  }, []);


  return (
    <main className="lg:grid lg:grid-cols-3">
      <div className="lg:col-span-2 bg-gray-900 h-screen overflow-y-scroll overflow-x-auto relative">
        <form className="absolute inset-x-0 bottom-0 mx-4 my-2 flex gap-3 items-center bg-gray-800 p-4 rounded-lg shadow-lg">
          <input
            className='py-2 px-4 font-semibold text-lg bg-gray-700 text-white rounded-md border-none focus:ring-2 focus:ring-blue-500 focus:outline-none w-full'
            type="text"
            placeholder="Escribe tu mensaje..."
          />
          <i className="fa-solid fa-paper-plane text-blue-500 text-2xl hover:cursor-pointer hover:text-blue-600 transition-colors"></i>
        </form>
      </div>

      <div className="lg:col-span-1 bg-gray-100 p-6">
        {
          !isLogged
          &&
          <ChatInfo/>
        }
      </div>
    </main>
  )
}
