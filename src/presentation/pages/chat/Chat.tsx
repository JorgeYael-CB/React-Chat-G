import { useEffect, useState } from "react";
import { ServerStore, store } from "../../store";
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
  const { serverActive } = ServerStore();
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState<UserInterface>();


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
        const payload:MessageInterface = data;

        console.log('Mandaron nuevo mensaje');
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
    <main className="lg:grid lg:grid-cols-3">
      <div className="lg:col-span-2 bg-gray-900 h-screen overflow-y-scroll overflow-x-auto relative">
        {
          serverActive
          ? <FormMessage/>
          : <JoinChat/>
        }
      </div>

      <div className="lg:col-span-1 bg-gray-100 p-4">
        {
          isLogged && userData
          ? <UserData user={ userData }/>
          : <ChatInfo/>
        }
      </div>
    </main>
  )
}
