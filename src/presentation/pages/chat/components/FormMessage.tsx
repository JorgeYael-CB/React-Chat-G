import { FormEvent, useEffect, useState } from "react"
import { sendMessage } from "../../../../core/server";
import { ServerStore, store } from "../../../store";


export const FormMessage = () => {
  const { token } = store();
  const { id } = ServerStore();
  const [messageContent, setMessageContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [validSendMessage, setValidSendMessage] = useState(false);


  useEffect(() => {
    setValidSendMessage( (isLoading || messageContent.trim().length <= 0) );
  }, [isLoading, messageContent])

  const onSubmit = async( e:FormEvent<HTMLFormElement> ) => {
    e.preventDefault();
    if( messageContent.trim().length <= 0 || !token || !id ) return;

    setIsLoading(true);
    const res = await sendMessage({token, content: messageContent, serverId: id});
    setIsLoading(false)

    if( res.error ){
      console.log(res.error);
      return;
    }

    console.log('Mensaje enviado correctamente!');
  }


  return (
    <form onSubmit={onSubmit} className="absolute inset-x-0 bottom-0 mx-4 my-2 flex gap-3 items-center bg-gray-800 p-4 rounded-lg shadow-lg">
      <input
        value={ messageContent }
        onChange={ e => setMessageContent(e.target.value.toString()) }
        className='py-2 px-4 font-semibold text-lg bg-gray-700 text-white rounded-md border-none focus:ring-2 focus:ring-blue-500 focus:outline-none w-full'
        type="text"
        placeholder="Escribe tu mensaje..."
      />
      <i className={`fa-solid fa-paper-plane text-blue-500 text-2xl hover:cursor-pointer hover:text-blue-600 transition-colors ${validSendMessage ? 'opacity-50' : 'opacity-100'}`}></i>
    </form>
  )
}
