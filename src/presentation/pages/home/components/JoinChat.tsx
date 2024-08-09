import { FormEvent, useState } from "react"
import { ServerStore, store } from "../../../store";
import { joinRandomServer } from "../../../../core/server";
import { Loading } from "../../../components/spinners";




export const JoinChat = () => {
  const { userOnline, setServerActive, setId, setServerUuid } = ServerStore();
  const { isLogged, token } = store();
  const [isLoading, setIsLoading] = useState(false);


  const onSubmit = async( e:FormEvent<HTMLFormElement> ) => {
    e.preventDefault();

    if( !isLogged || !token ){
      console.log("Inicia sesion para continuar.");
      return;
    }

    if( !userOnline ){
      console.log("Parece que el cliente no esta conectado, quieres recargar el navegador para continuar?");
      return;
    }

    setIsLoading(true);
    const data = await joinRandomServer(token);
    setIsLoading(false);

    if( data.error ){
      return console.log(data.error);
    }

    setId( data.server!.id );
    setServerUuid( data.server!.serverId );
    setServerActive(true);
  }


  return (
    <>
    {
      !isLoading
      ?
      <div className="flex items-center justify-center h-full px-4">
        <form onSubmit={ onSubmit } className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-xl">
          <div className="text-center mb-4">
            <h2 className="text-2xl text-white font-bold">Join or Find a Chat</h2>
            <p className="text-gray-400">Join a new chat or search for an existing chat by ID</p>
          </div>

          <div>
            <label htmlFor="search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                </svg>
              </div>
              <input type="search" id="search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search"/>
              <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
            </div>
          </div>

          <p className="text-gray-400 mt-5 text-center">
            Our chat platform allows you to connect with people globally. Select a chat room by country or search by ID to join the conversation!
          </p>
          <div className="flex gap-3 mt-6 justify-center">
            <button className="py-2 px-4 bg-indigo-500 text-white font-semibold rounded-md hover:bg-indigo-600 transition-colors">
              Join New Chat
            </button>
            <button className="py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition-colors">
              Search by ID
            </button>
          </div>
        </form>
      </div>
      : <Loading/>
    }
    </>
  )
}
