import { FormEvent, useState } from "react"
import { ServerStore, store } from "../../../store";
import { joinRandomServer } from "../../../../core/server";
import { Loading } from "../../../components/spinners";
import { useNavigate } from "react-router-dom";
import { AlertForm } from "../../../components/alerts";
import { joinServerById } from "../../../../core/server/join-server-by-id";




export const JoinChat = () => {
  const { userOnline } = ServerStore();
  const { isLogged, token } = store();
  const [isLoading, setIsLoading] = useState(false);
  const nav = useNavigate();
  const [alertLogin, setAlertLogin] = useState(false);
  const [serverId, setServerId] = useState('');
  const [errorById, setErrorById] = useState<string>();


  function validations(){
    if( !isLogged || !token ){
      setAlertLogin(true);
      return false;
    }

    if( !userOnline ){
      console.log("Parece que el cliente no esta conectado, quieres recargar el navegador para continuar?");
      return false;
    }

    return true;
  }


  const joinById = async() => {
    const validation = validations();
    if( !validation ) return;

    if( serverId.trim().length < 10 ) return setErrorById('Server id is too short.');

    setIsLoading(true);
    const data = await joinServerById({serverId, token: token!});
    setIsLoading(false);

    if( data.error || !data.server ){
      return setErrorById(data.error ?? "Unexpected Error.");
    }

    nav(`/chat/${data.server.serverId}`); // Uuid
  }

  const onSubmit = async( e:FormEvent<HTMLFormElement> ) => {
    e.preventDefault();
    const validation = validations();
    if( !validation ) return;

    setIsLoading(true);
    const data = await joinRandomServer(token!);
    setIsLoading(false);

    if( data.error || !data.server ){
      return console.log(data.error ?? "Unexpected Error.");
    }

    nav(`/chat/${data.server.serverId}`); // Uuid
  }


  return (
    <>
    {
      !isLoading
      ?
      <div className="flex items-center justify-center h-full px-4">
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-xl">
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
              <input onChange={ (e) => setServerId(e.target.value) } type="search" id="search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search"/>
              <button onClick={ joinById } type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
            </div>
          </div>

          <p className="text-gray-400 mt-5 text-center">
            Our chat platform allows you to connect with people globally. Select a chat room by country or search by ID to join the conversation!
          </p>
          <form onSubmit={ onSubmit } className="flex gap-3 mt-6 justify-center">
            <button className="py-2 px-4 bg-indigo-500 text-white font-semibold rounded-md hover:bg-indigo-600 transition-colors">
              Join New Random Group Chat
            </button>
          </form>

          {
            errorById
            &&
            <AlertForm className="my-4" message={errorById} error/>
          }
          {
            alertLogin
            &&
            <AlertForm className="my-4" message={"Please log in to continue."} error/>
          }
        </div>
      </div>
      : <Loading/>
    }
    </>
  )
}
