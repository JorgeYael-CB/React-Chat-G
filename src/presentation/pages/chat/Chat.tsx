import { useEffect, useState } from "react";
import { ServerStore, store } from "../../store";
import { ChatInfo, FormMessage, UserData } from "./components";
import { UserInterface } from "../../interfaces/auth";
import { getUser } from "../../../core/auth";
import { Loading } from "../../components/spinners";

export const Chat = () => {
  const { isLogged, token, logout } = store();
  const { serverActive } = ServerStore();
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState<UserInterface>();


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
          ?<FormMessage/>
          :
          <div className="flex items-center justify-center h-full">
            <form className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md">
              <div className="text-center mb-4">
                <h2 className="text-2xl text-white font-bold">Join or Find a Chat</h2>
                <p className="text-gray-400">Join a new chat or search for an existing chat by ID</p>
              </div>
              <input
                className="py-2 px-4 font-semibold text-lg bg-gray-700 text-white rounded-md border-none focus:ring-2 focus:ring-indigo-500 focus:outline-none w-full"
                type="text"
                placeholder="Enter chat ID..."
              />
              <button className="py-2 px-6 mt-4 bg-indigo-500 text-white font-semibold rounded-md hover:bg-indigo-600 transition-colors w-full">
                Join Chat
              </button>
              <p className="text-gray-400 mt-4 text-center">
                Our chat platform allows you to connect with people globally. Select a chat room by country or search by ID to join the conversation!
              </p>
              <div className="flex gap-3 mt-4 justify-center">
                <button className="py-2 px-4 bg-indigo-500 text-white font-semibold rounded-md hover:bg-indigo-600 transition-colors">
                  Join New Chat
                </button>
                <button className="py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition-colors">
                  Search by ID
                </button>
              </div>
            </form>
          </div>
        }
      </div>

      <div className="lg:col-span-1 bg-gray-100 p-4">
        {
          isLogged && userData
          ? <UserData user={ userData }/>
          : <ChatInfo/>
        }
      </div>
    </main>
  )
}
