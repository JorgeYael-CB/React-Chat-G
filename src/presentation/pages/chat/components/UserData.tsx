import { UserInterface } from '../../../interfaces/auth/user.interface';
import { FaEdit } from 'react-icons/fa';

export const UserData = ({ user }: { user: UserInterface }) => {
  return (
    <main className="shadow-md bg-gray-100 py-10">
      <div className="flex flex-col items-center bg-white mx-auto max-w-xl rounded-lg p-6 border-4 border-blue-700 my-8 shadow-lg">
        <img
          src={user.img}
          className="w-32 h-32 rounded-full border-4 border-blue-500"
          alt="Profile image"
        />
        <h1 className="font-semibold text-2xl mt-4">{user.name}</h1>
        <div className="mt-4 flex items-center gap-2">
          <img src={`/countrys/${user.country.toLowerCase()}.png`} className="w-10 h-10 rounded" alt="Country Flag" />
          <p className="text-lg text-gray-700">{user.country}</p>
        </div>
      </div>

      <div className="mt-12 bg-white mx-auto max-w-xl rounded-lg p-6 border-4 border-blue-700 my-8 shadow-lg">
        <h2 className="text-lg bg-blue-300 text-center py-2 rounded-t-lg">Account information</h2>
        <div className="flex flex-col gap-6 mt-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg text-gray-700">Name:</h3>
            <div className="flex items-center gap-4">
              <p className="text-lg text-gray-700">{user.name}</p>
              <FaEdit className="text-blue-500 cursor-pointer hover:text-blue-700" />
            </div>
          </div>
          <hr className="border-t-2 border-gray-300" />
          <div className="flex justify-between items-center">
            <h3 className="text-lg text-gray-700">Email:</h3>
            <div className="flex items-center gap-4">
              <p className="text-lg text-gray-700">{user.email}</p>
              <FaEdit className="text-blue-500 cursor-pointer hover:text-blue-700" />
            </div>
          </div>
          <hr className="border-t-2 border-gray-300" />
          <div className="flex justify-between items-center">
            <h3 className="text-lg text-gray-700">Password:</h3>
            <div className="flex items-center gap-4">
              <p className="text-lg text-gray-700">********</p>
              <FaEdit className="text-blue-500 cursor-pointer hover:text-blue-700" />
            </div>
          </div>
          <hr className="border-t-2 border-gray-300" />
          <div className="flex justify-between items-center">
            <h3 className="text-lg text-gray-700">Profile image:</h3>
            <FaEdit className="text-blue-500 cursor-pointer hover:text-blue-700" />
          </div>
          <div className="flex justify-between items-center">
            <h3 className="text-lg text-gray-700">Country:</h3>
            <FaEdit className="text-blue-500 cursor-pointer hover:text-blue-700" />
          </div>
        </div>
      </div>
    </main>
  );
};
