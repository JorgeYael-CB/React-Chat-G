import { FormEvent, useState } from "react"
import { IoMdSend } from "react-icons/io"


interface Props {
  onSendMessage: ( value: string ) => void;
}


export const FormMessage = ( { onSendMessage }: Props ) => {
  const [message, setMessage] = useState('');


  const onSubmit = ( e:FormEvent<HTMLFormElement> ) => {
    e.preventDefault();
    if( message.trim().length <= 0 ) return;
    setMessage('');
    onSendMessage( message.trim() );
  }


  return (
    <form onSubmit={ onSubmit } className="px-8 py-4 flex flex-row gap-4 bg-gray-200">
      <input
        value={ message }
        onChange={ e => setMessage(e.target.value) }
        type="text"
        placeholder="Write message..."
        className="focus:outline-blue-600 w-full px-4 py-2 font-medium text-base rounded-lg bg-white"
      />
      <button>
        <IoMdSend
          className="text-blue-600 font-medium text-center px-2 py-1 rounded-lg h-12 w-12 transition-colors hover:cursor-pointer hover:text-blue-700"
        />
      </button>
    </form>
  )
}
