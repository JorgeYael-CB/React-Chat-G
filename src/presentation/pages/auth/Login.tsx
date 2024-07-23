import { NavLink } from "react-router-dom"
import { store } from "../../store"
import { FormEvent } from "react";


export const Login = () => {
  const { login } = store();


  const onSubmit = ( e:FormEvent<HTMLFormElement> ) => {
    e.preventDefault();
  }


  return (
    <main>
      <div className="my-24 text-center">
        <h1 className="text-black font-black md:text-6xl text-5xl">Welcome back!</h1>
      </div>

      <form
        onSubmit={ onSubmit }
        className="max-w-xl mx-auto py-4 px-6 bg-white shadow-md"
      >
        <h2 className="text-center text-3xl font-bold text-gray-500">Sign In</h2>
        <p className="font-medium md:text-lg text-base mt-1.5 text-center mb-12 text-gray-700">Please log in with your account to continue.</p>

        <div className="flex flex-col gap-2">
          <label
            className="text-lg font-medium"
            htmlFor="email">Email:</label>
          <input
            id="email"
            className="py-1 px-2 font-medium text-sm focus:outline-none border-2 border-indigo-300 focus:border-indigo-600 transition-colors rounded-md"
            type="email"
            placeholder="example@correo.com"
          />
        </div>
        <div className="flex flex-col gap-2 mt-5">
          <label
            className="text-lg font-medium"
            htmlFor="password">Password:</label>
          <input
            id="password"
            className="py-1 px-2 font-medium text-sm focus:outline-none border-2 border-indigo-300 focus:border-indigo-600 transition-colors rounded-md"
            type="password"
            placeholder="example123"
          />
        </div>

        <div className="flex flex-row md:justify-around justify-between px-2 my-6">
          <NavLink className={'underline text-blue-600 text-sm font-semibold'} to={'/auth/forgot-password'}> Reset password.</NavLink>
          <NavLink className={'underline text-blue-600 text-sm font-semibold'} to={'/auth/register'}>Create account.</NavLink>
        </div>

        <div className="flex flex-row justify-center px-8 mt-2">
          <button className="bg-blue-600 font-bold text-center rounded-md p-2 w-full text-white hover:bg-blue-500 transition-colors">
            Sign in.
          </button>
        </div>
      </form>
    </main>
  )
}
