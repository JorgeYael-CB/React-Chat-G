import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { FormMessage, Message, Msg, User } from "./components";
import { store, WsStore } from "../../store";
import { JoinNewUser } from "../../interfaces/server";
import { MessageInterface } from "../../interfaces/messages";
import { getServerData, sendMessage } from "../../../core/server";
import { Loading } from "../../components/spinners";
import { UserInterface } from "../../interfaces/auth";



export const Chat = () => {
  const { serverId } = useParams();
  const { token, logout } = store();
  const { addEventListener } = WsStore();
  const { user } = store();
  const [users, setUsers] = useState<UserInterface[]>([]);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [serverIsLoading, setServerIsLoading] = useState(true);
  const [isLoadingMessage, setIsLoadingMessage] = useState(false);


  const getServerInfo = async() => {
    if( !token || !serverId ){
      logout();
      return;
    }

    const data = await getServerData({serverId, token});
    setServerIsLoading(false);

    if( data.error || !data.server ){
      console.log(data.error ?? 'Unexpected error!');
      return;
    }

    console.log(data.server.users);
    setUsers( data.server.users );
  }


  useEffect(() => {
    //TODO: buscar el servidor con ese ID
    getServerInfo();
  }, []);


  useEffect(() => {
    addEventListener<JoinNewUser>('new-user-joined', function(data) {
      if (data.serverUuid === serverId) {
        //TODO: Mensaje de bienvenida al nuevo usuario
        setUsers(prevUsers => [{...data.newUser}, ...prevUsers]);
      }
    });

    addEventListener<MessageInterface>('client-message', function(data) {
      if (data.serverUuid === serverId) {

        console.log(data);

        setMessages(prevMessages => [
          ...prevMessages,
          {
            ...data,
            delivered: true,
            myMessage: data.user.id === user!.id,
          }
        ]);
      }
    });

    // Limpiar los oyentes al desmontar el componente
    return () => {
      //TODO: eliminar los event listeners de WsStore mediante un metodo.
    };
  }, [serverId, addEventListener, user]);


  const onSendMessage = async( value: string ) => {
    setIsLoadingMessage(true);
    const data = await sendMessage({content: value, serverId: serverId!, token: token!});

    setIsLoadingMessage(false);
    if( data.error || !data.message ){
      console.log(data.error ?? 'Unexpected error.');
      return;
    }
  };


  return (
    serverIsLoading
    ? <Loading/>
    :
    <main>
      <div className='grid grid-cols-5 h-screen'>
        <div className="col-span-1 bg-gray-300 p-3 overflow-y-scroll">
          <h2 className="text-black font-semibold text-2xl mb-6">Users</h2>

          <ul className="space-y-4">
            {users?.map((user) => (
              <User key={user.id} user={user}/>
            ))}
          </ul>
        </div>

        <div className="col-span-3 bg-white flex flex-col overflow-y-hidden relative">
          <div className="flex-grow p-4 overflow-y-auto">
            {messages.map(msg => (
              <Message key={msg.id} msg={msg}/>
            ))}
          </div>

          <FormMessage validSendMessage={!isLoadingMessage} onSendMessage={ onSendMessage }/>
        </div>

        <div className='col-span-1 bg-black overflow-y-scroll'>
          <h2>Tu Configuracion</h2>
        </div>
      </div>
    </main>
  )
}
