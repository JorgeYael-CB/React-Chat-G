import { MessageInterface } from "../../../interfaces/messages"
import { store } from "../../../store"


interface Props {
  msg: MessageInterface,
}

export const Message = ({ msg }: Props) => {
  const { user } = store();


  return (
    <div
      className={`flex items-start gap-2.5 mb-4 ${
        msg.user._id === user!.id ? 'justify-end' : 'justify-start'
      }`}
      >
      {msg.user._id !== user!.id && (
        <img
          className="w-8 h-8 rounded-full"
          src={msg.user.img}
          alt={`Image ${msg.user.name}`}
        />
      )}
      <div
        className={`flex flex-col w-full md:max-w-[320px] max-w-xl p-4 rounded-lg ${
          msg.user._id === user!.id
            ? 'bg-blue-500 text-white self-end'
            : 'bg-gray-100 text-gray-900 dark:bg-gray-700 dark:text-white'
        }`}
      >
        <div className="flex items-center space-x-2 rtl:space-x-reverse">
          <span className="text-sm font-semibold">
            {msg.user.name}
          </span>
        </div>
        <p className="text-sm font-normal py-2.5">
          {msg.content}
        </p>
        <span className="text-xs font-normal text-gray-500 dark:text-gray-400">
          Delivered
        </span>
      </div>
      {msg.user._id === user!.id && (
        <img
          className="w-8 h-8 rounded-full"
          src={msg.user.img}
          alt={`Image ${msg.user.name}`}
        />
      )}
    </div>
  )
}
