import { useEffect, useState } from "react";
import { store } from "../../store";
import { ChatInfo, FormMessage, UserData } from "./components";
import { UserInterface } from "../../interfaces/auth";
import { getUser } from "../../../core/auth";
import { Loading } from "../../components/spinners";

export const Chat = () => {
  const { isLogged, token, logout } = store();
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
        <FormMessage/>
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
