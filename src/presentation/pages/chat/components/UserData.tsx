import { UserInterface } from '../../../interfaces/auth/user.interface';



export const UserData = ( {user}: {user: UserInterface} ) => {


  return (
    <main className="shadow-md bg-gray-100 py-10">
      <div className="flex flex-col items-center bg-white mx-auto max-w-xl rounded-lg p-6 border-4 border-blue-700 my-8 shadow-lg">
        <img
          src={user.img}
          className="w-32 h-32 rounded-full border-2 border-blue-500"
          alt="Profile image"
        />
        <h1 className="font-semibold text-2xl mt-4">{user.name}</h1>
        <div className="mt-4 flex items-center gap-2">
          <img src="/countrys/bo.png" className="w-10 h-10 rounded" alt="Country Flag" />
          <p className="text-lg text-gray-700">{user.country}</p>
        </div>
      </div>
    </main>
  )
}
