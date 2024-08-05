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
  const { setOnline, userOnline, serverActive, id } = ServerStore();
  const [socket, useSocket] = useState<WebSocket>();
  const { isLogged, token, logout, user } = store();
  const { messages, setNewMessage } = ChatStore();
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState<UserInterface>();


  useEffect(() => {
    if( userOnline ) return;

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
        console.log({id, id2: payload.serverId});

        if( payload.serverId === id ){
          setNewMessage(payload);
        }
      } else if( data.type === "new-user-joined" ){
        console.log("Un nuevo usuario se ha unido al servidor!");
      }

      // {"type":"new-user-joined","payload":{"userId":"66aaa24055664c26ec736379","serverId":"fa314548-ea39-4851-abeb-e4656329d9b8"}}
    })
  }, [socket, id]);


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
              <p key={Math.random()} className={`text-white text-2xl ${msg.userId === user!.id ? 'text-green-500' : 'text-red-500'}`}>
                {msg.content}
              </p>
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
