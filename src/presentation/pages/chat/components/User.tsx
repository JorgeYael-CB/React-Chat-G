import { UserDbInterface } from "../../../interfaces/server"


export const User = ({user}: {user: UserDbInterface}) => {
  return (
    <li key={user.name} className="flex items-center gap-4 p-2 bg-white rounded-lg hover:bg-gray-100 transition-colors">
      <button>
        <img className="w-12 h-12 p-1 rounded-full ring-2 ring-blue-300 dark:ring-blue-500" src={user.img} alt={`${user.name} img`}/>
      </button>
      <div className="text-black">
        <p className="font-bold text-lg">{user.name}</p>
        <img className="w-6 h-4" src={`/countrys/${user.country!.toLowerCase()}.png`} alt={`${user.country} img`} />
      </div>
    </li>
  )
}
