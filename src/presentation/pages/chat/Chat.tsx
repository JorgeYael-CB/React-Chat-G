import { useEffect, useState } from "react";
import { ServerStore, store } from "../../store";
import { ChatInfo, FormMessage, JoinChat, UserData } from "./components";
import { UserInterface } from "../../interfaces/auth";
import { getUser } from "../../../core/auth";
import { Loading } from "../../components/spinners";
import { envs } from "../../../config";




const connectionSocketServer = () => {
  const socket = new WebSocket(envs.UrlWss);

  return socket;
}



//TODO: https://socket.io/docs/v4/

export const Chat = () => {
  const [socket] = useState(connectionSocketServer());
  const { isLogged, token, logout } = store();
  const { serverActive } = ServerStore();
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState<UserInterface>();
  const [online, setOnline] = useState(false);


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

    // return socket.disconnect()
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
          ? <UserData online={ online } user={ userData }/>
          : <ChatInfo/>
        }
      </div>
    </main>
  )
}
