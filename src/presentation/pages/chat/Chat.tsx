import { useEffect } from "react";

export const Chat = () => {

  useEffect(() => {
    // TODO: obtener los datos del usuario y validar que su sesion no haya sido expirada.
  }, []);

  return (
    <>
      <main className="lg:grid lg:grid-cols-3">
        <div className="lg:col-span-2 bg-black h-screen overflow-y-scroll overflow-x-auto relative">
          <form className="absolute inset-x-0 bottom-0 mx-4 my-2 flex gap-3 items-center bg-gray-800 p-3 rounded-lg shadow-md">
            <input
              className='py-2 px-3 font-semibold text-base bg-gray-700 text-white rounded-md border-none focus:ring-2 focus:ring-blue-500 focus:outline-none w-full'
              type="text"
              placeholder="Escribe tu mensaje..."
            />
            <i className="fa-solid fa-paper-plane text-blue-500 text-2xl hover:cursor-pointer hover:text-blue-600 transition-colors"></i>
          </form>
        </div>

        <div className="lg:col-span-1">
        </div>
      </main>
    </>
  )
}
