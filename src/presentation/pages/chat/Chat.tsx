import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { FormMessage, Message, Msg, User } from "./components";
import { store, WsStore } from "../../store";
import { JoinNewUser, UserDbInterface } from "../../interfaces/server";
import { MessageInterface } from "../../interfaces/messages";



export const Chat = () => {
  const { serverId } = useParams();
  const { addEventListener } = WsStore();
  const { user } = store();
  const [users, setuSers] = useState<UserDbInterface[]>([]);
  const [messages, setMessages] = useState<Msg[]>([]);



  useEffect(() => {
    //TODO: buscar el servidor con ese ID
  }, []);


  useEffect(() => {
    addEventListener<JoinNewUser>('new-user-joined', function(data) {
      if (data.serverUuid === serverId) {
        //TODO: Mensaje de bienvenida al nuevo usuario
        setuSers(prevUsers => [...prevUsers, {...data.newUser, id: data.newUser._id}]);
      }
    });

    addEventListener<MessageInterface>('client-message', function(data) {
      if (data.serverUuid === serverId) {
        setMessages(prevMessages => [
          ...prevMessages,
          {
            ...data,
            delivered: true,
            myMessage: data.user._id === user!.id,
          }
        ]);
      }
    });

    // Limpiar los oyentes al desmontar el componente
    return () => {
      //TODO: eliminar los event listeners de WsStore mediante un metodo.
    };
  }, [serverId, addEventListener, user]);


  return (
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

          <FormMessage onSendMessage={ (value) => console.log(value) }/>
        </div>

        <div className='col-span-1 bg-black overflow-y-scroll'>
          <h2>Tu Configuracion</h2>
        </div>
      </div>
    </main>

  )
}
