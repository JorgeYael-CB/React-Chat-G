import { useEffect, useState } from "react";
import { ChatStore, ServerStore, store } from "../../store";
import { ChatInfo, JoinChat, UserData } from "./components";
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
  const { setOnline, userOnline } = ServerStore();
  const [socket, useSocket] = useState<WebSocket>();
  const { isLogged, token, logout } = store();
  const { setNewMessage, setNewUser} = ChatStore();
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
      <div className="lg:col-span-2 lg:py-0 py-12 lg:h-screen bg-slate-900">
        <JoinChat/>
      </div>

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
