import { useEffect, useState } from "react";
import { ChatStore, ServerStore, store } from "../../store";
import { ChatInfo, FormMessage, JoinChat, Message, UserData } from "./components";
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

export const Home = () => {
  const { setOnline, userOnline, serverActive, id } = ServerStore();
  const [socket, useSocket] = useState<WebSocket>();
  const { isLogged, token, logout } = store();
  const { messages, setNewMessage, setNewUser} = ChatStore();
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState<UserInterface>();


  useEffect(() => {
    if( userOnline || !isLogged ) return;
    useSocket( connectionSocketServer() );
  }, []);


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
    }
  }, [socket]);


  useEffect(() => {
    if( !socket ) return;

    socket.addEventListener('message', event => {
      const data = JSON.parse(event.data);
      const typeMessage:WsType = 'client-message';

      if( data.type === typeMessage ){
        const payload:MessageInterface = data.payload;

        if( payload.id == id ){
          setNewMessage(payload);
        }

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
            <Message key={index + (Math.random() * Date.now())} msg={msg}/>
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
