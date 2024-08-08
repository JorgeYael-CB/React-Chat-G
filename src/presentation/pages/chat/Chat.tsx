import { useEffect, useState } from "react";
import { ChatStore, ServerStore, store } from "../../store";
import { ChatInfo, FormMessage, JoinChat, UserData } from "./components";
import { UserInterface } from "../../interfaces/auth";
import { getUser } from "../../../core/auth";
import { Loading } from "../../components/spinners";
import { envs } from "../../../config";
import { MessageInterface, NewUser, WsType } from "../../interfaces/messages";


const connectionSocketServer = () => {
  const socket = new WebSocket(envs.UrlWss);

  return socket;
}



//TODO: https://socket.io/docs/v4/

export const Chat = () => {
  const { setOnline, userOnline, serverActive, id } = ServerStore();
  const [socket, useSocket] = useState<WebSocket>();
  const { isLogged, token, logout } = store();
  const { messages, setNewMessage, setNewUser} = ChatStore();
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState<UserInterface>();


  useEffect(() => {
    if( userOnline || !isLogged ) return;

    useSocket( connectionSocketServer() );
    console.log('Intentando conectarme.');
  }, []);


  useEffect(() => {
    console.log('Nuevo mensaje recibido');
  }, [messages]);


  useEffect(() => {
    if( !socket ) return;

    socket.onopen = () => {
      setOnline(true);
    }
  }, [socket]);

  useEffect(() => {
    if( !socket ) return;

    socket.onclose = () => {
      setOnline(false);

      //TODO: mandar mensaje al servidor de un cliente desconectado

      console.log('cliente desconectado');
    }
  }, [socket]);


  useEffect(() => {
    if( !socket ) return;

    socket.addEventListener('message', event => {
      const data = JSON.parse(event.data);
      const typeMessage:WsType = 'client-message';

      if( data.type === typeMessage ){
        const payload:MessageInterface = data.payload;

        setNewMessage(payload);
      } else if( data.type === "new-user-joined" ){
        const payload:NewUser = data.payload;
        setNewUser(payload.newUser);

        //TODO: mandar mensaje de bienvenida al nuevo usuario
      }
    })
  }, [socket]);


  async function getUserById(bearerToken:string){
    const user = await getUser(bearerToken);
    setIsLoading(false);

    if( user.error ){
      console.log(user.error);
      return logout();
    }

    setUserData(user.user);
  }

  useEffect(() => {
    if( isLogged && token ){
      setIsLoading(true);
      getUserById(token);
    }
  }, []);


  return (
    isLoading
    ? <Loading/>
    :
    <main className="grid lg:grid-cols-3">
      {
        serverActive
        ?<div className="lg:col-span-2 bg-gray-900 h-screen overflow-y-scroll overflow-x-auto relative">
          {messages.map((msg, index) => (
                <div key={index} className={`flex items-start gap-2.5`}>
                  <img className="w-8 h-8 rounded-full" src={msg.user.img} alt={`Image ${msg.user.name}`} />
                  <div className={`flex flex-col w-full max-w-[320px] p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700 ${msg.user._id === id ? 'bg-blue-500 text-white' : ''}`}>
                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                      <span className="text-sm font-semibold text-gray-900 dark:text-white">Holaf</span>
                    </div>
                    <p className="text-sm font-normal py-2.5 text-gray-900 dark:text-white">{msg.content}</p>
                    <span className="text-sm font-normal text-gray-500 dark:text-gray-400">Delivered</span>
                  </div>
                  <button id="dropdownMenuIconButton" data-dropdown-toggle="dropdownDots" data-dropdown-placement="bottom-start" className="inline-flex self-center items-center p-2 text-sm font-medium text-center text-gray-900 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-800 dark:focus:ring-gray-600" type="button">
                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 4 15">
                      <path d="M3.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 6.041a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 5.959a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
                    </svg>
                  </button>
                  <div id="dropdownDots" className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-40 dark:bg-gray-700 dark:divide-gray-600">
                    <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownMenuIconButton">
                      <li>
                        <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Reply</a>
                      </li>
                      <li>
                        <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Forward</a>
                      </li>
                      <li>
                        <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Copy</a>
                      </li>
                      <li>
                        <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Report</a>
                      </li>
                      <li>
                        <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Delete</a>
                      </li>
                    </ul>
                  </div>
                </div>
              ))}
          <FormMessage/>
        </div>
        : <div className="lg:col-span-2 lg:py-0 py-12 lg:h-screen bg-slate-900">
          <JoinChat/>
        </div>
      }


      <div className="lg:col-span-1 bg-gray-100 p-4 h-screen">
        {
          isLogged && userData
          ? <UserData user={ userData }/>
          : <ChatInfo/>
        }
      </div>
    </main>
  )
}
