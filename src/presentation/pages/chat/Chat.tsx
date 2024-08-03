import { useEffect, useState } from "react";
import { ChatStore, ServerStore, store } from "../../store";
import { ChatInfo, FormMessage, JoinChat, UserData } from "./components";
import { UserInterface } from "../../interfaces/auth";
import { getUser } from "../../../core/auth";
import { Loading } from "../../components/spinners";
import { envs } from "../../../config";
import { MessageInterface, WsType } from "../../interfaces/messages";


const connectionSocketServer = () => {
  const socket = new WebSocket(envs.UrlWss);

  return socket;
}



//TODO: https://socket.io/docs/v4/

export const Chat = () => {
  const { setOnline } = ServerStore();
  const [socket] = useState(connectionSocketServer());
  const { isLogged, token, logout } = store();
  const { messages, setNewMessage } = ChatStore();
  const { id } = ServerStore();
  const { serverActive } = ServerStore();
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState<UserInterface>();


  useEffect(() => {
    console.log('Nuevo mensaje recibido');
  }, [messages]);


  useEffect(() => {
    socket.onopen = () => {
      setOnline(true);
    }
  }, [socket]);

  useEffect(() => {
    socket.onclose = () => {
      setOnline(false);
      console.log('cliente desconectado');
    }
  }, [socket]);

  useEffect(() => {
    socket.addEventListener('message', event => {
      const data = JSON.parse(event.data);
      const typeMessage: WsType = 'client-message';

      if( data.type === typeMessage ){
        const payload:MessageInterface = data.payload;

        console.log({id: id, id2: payload.serverId});

        if( payload.serverId === id ){
          setNewMessage(payload);
        }
      }

      // {"type":"new-user-joined","payload":{"userId":"66aaa24055664c26ec736379","serverId":"fa314548-ea39-4851-abeb-e4656329d9b8"}}
    })
  }, [socket])


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
          {
            messages.map( msg => (
              <div key={Date.now()} className="text-white text-2xl">
                {msg.content}
              </div>
            ))
          }
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
