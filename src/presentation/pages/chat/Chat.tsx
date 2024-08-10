import { useParams } from "react-router-dom"


export const Chat = () => {
  const { serverId } = useParams();


  return (
    <main>

      <div className="flex flex-col gap-2 my-2">
        <h2 className="text-center text-black font-semibold text-2xl mt-4">Quieres iniciar un nuevo chat?</h2>

        <form className="flex flex-row justify-center my-2 items-center gap-0.5">
          <label htmlFor='server-id' className="font-bold opacity-40 text-xl">#</label>
          <input
            id="server-id"
            type='text'
            placeholder='your_server_ID'
            className='w-full max-w-lg transition-colors duration-200 bg-gray-200 rounded-lg text-base font-medium px-3 py-1 focus:outline-blue-500'
          />
          <button className='transition-colors bg-blue-600 text-base font-medium px-3 py-1 rounded-lg outline-black text-white ml-3 hover:bg-blue-700'>Search</button>
        </form>
      </div>

      <div className='grid grid-cols-4'>
        <div className='col-span-1 bg-indigo-700'>
          <h2>Usuarios</h2>
        </div>

        <div className='col-span-2 bg-white'>
          <h2>Chat</h2>
        </div>

        <div className='col-span-1 bg-black'>
          <h2>Tu Configuracion</h2>
        </div>
      </div>
    </main>
  )
}
