import { useState } from "react";
import { useParams } from "react-router-dom"
import { UserInterface } from "../../interfaces/auth";
import { User } from "./components";


export const Chat = () => {
  const { serverId } = useParams();
  const [users, setuSers] = useState<UserInterface[]>([
    {
      active: false,
      country: 'mx',
      email: 'correo@correo.com',
      id: "adwawd",
      img: "https://th.bing.com/th/id/R.ccf74d22c13a06fd773af8643dc8277a?rik=%2bazONGeen5L8PQ&pid=ImgRaw&r=0",
      messages: [],
      name: "Andrea",
    roles: ["USER"],
    },
    {
      active: false,
      country: 'mx',
      email: 'correo@correo2.com',
      id: "adwawd2",
      img: "https://th.bing.com/th/id/OIP.hBFh-SwqngbQFyUcOkHcDQHaLH?rs=1&pid=ImgDetMain",
      messages: [],
      name: "Carlos",
    roles: ["ADMIN"],
    },
  ]);



  return (
    <main className="min-h-screen flex flex-col">

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

      <div className='grid grid-cols-5 '>
        <div className="col-span-1 bg-gray-200 h-screen overflow-y-auto p-3">
          <h2 className="text-black font-semibold text-2xl mb-6">Users</h2>

          <ul className="space-y-4">
            {users?.map((user) => (
              <User key={user.id} user={user}/>
            ))}
          </ul>
        </div>

        <div className='col-span-3 bg-white'>
          <h2>Chat</h2>
        </div>

        <div className='col-span-1 bg-black'>
          <h2>Tu Configuracion</h2>
        </div>
      </div>
    </main>
  )
}
