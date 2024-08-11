import { MessageInterface } from "../../../interfaces/messages";



export interface Msg extends MessageInterface {
  myMessage: boolean;
  delivered: boolean;
}


export const Message = ( {msg}: {msg: Msg } ) => {
  return (
    <div
      key={msg.id}
      className={`flex items-start ${!msg.delivered? 'opacity-50': ''} space-x-4 my-2 ${msg.myMessage ? 'justify-end' : ''}`}
    >
      {!msg.myMessage && (
        <img
          src={msg.user.img}
          alt={msg.user.name}
          className="h-10 w-10 rounded-full"
        />
      )}
      <div>
        <div className={`flex items-center space-x-2 ${msg.myMessage ? 'justify-end' : ''}`}>
          <h4 className="font-semibold text-lg text-gray-800">{msg.user.name}</h4>
          <span className="text-xs text-gray-500">{new Date(msg.createdAt).toLocaleTimeString()}</span>
        </div>
        <p className={`text-gray-700 p-2 rounded-lg max-w-2xl ${msg.myMessage ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
          {msg.content}
        </p>
      </div>
      {msg.myMessage && (
        <img
          src={msg.user.img}
          alt={msg.user.name}
          className="h-10 w-10 rounded-full"
        />
      )}
    </div>
  )
}
