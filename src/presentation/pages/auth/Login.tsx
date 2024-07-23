import { NavLink } from "react-router-dom"
import { store } from "../../store"
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { ValidateData } from "../../../config";
import { AlertForm } from "../../components/alerts";
import { loginUser } from "../../../core/auth";


export const Login = () => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState<string>();
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState<string>();
  const [loginError, setLoginError] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);
  const { login } = store();


  const disabled = () => {
    return (!emailError && !passwordError) && (email !== '' && password !== '') && (!isLoading);
  }


  useEffect(() => {
    setPassword('');
  }, [loginError])


  const onSubmit = async( e:FormEvent<HTMLFormElement> ) => {
    e.preventDefault();
    if( !disabled() ) return;
    setIsLoading(true);
    setLoginError(undefined);

    // TODO: login del usuario - http
    const data = await loginUser({password, email});
    setIsLoading(false);

    if( data.error ){
      return setLoginError(data.error);
    };

    login({...data.user!});
    console.log('El usuario ya se loggeo');
  }


  const onChangeEmail = ( e:ChangeEvent<HTMLInputElement> ) => {
    const { target: { value } } = e;
    const [ emailErr ] = ValidateData.email(value);

    if( emailErr ){
      setEmailError( emailErr );
    } else {
      setEmailError(undefined);
    };

    setEmail(value);
  }

  const onChangePassword = (e:ChangeEvent<HTMLInputElement> ) => {
    const { target: { value } } = e;
    const [ passError ] = ValidateData.password(value);

    if( passError ){
      setPasswordError( passError );
    } else {
      setPasswordError( undefined );
    };

    setPassword(value);
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
            onChange={ onChangeEmail }
            value={ email }
            id="email"
            className="py-1 px-2 font-medium text-sm focus:outline-none border-2 border-indigo-300 focus:border-indigo-600 transition-colors rounded-md"
            type="email"
            placeholder="example@correo.com"
          />

          {
            emailError
            &&
            <AlertForm message={emailError} error/>
          }
        </div>
        <div className="flex flex-col gap-2 mt-5">
          <label
            className="text-lg font-medium"
            htmlFor="password">Password:</label>
          <input
            onChange={ onChangePassword }
            value={ password }
            id="password"
            className="py-1 px-2 font-medium text-sm focus:outline-none border-2 border-indigo-300 focus:border-indigo-600 transition-colors rounded-md"
            type="password"
            placeholder="example123"
          />

          {
            passwordError
            &&
            <AlertForm message={passwordError} error/>
          }
        </div>

        <div className="flex flex-row md:justify-around justify-between px-2 my-6">
          <NavLink className={'underline text-blue-600 text-sm font-semibold'} to={'/auth/forgot-password'}> Reset password.</NavLink>
          <NavLink className={'underline text-blue-600 text-sm font-semibold'} to={'/auth/register'}>Create account.</NavLink>
        </div>

        <div className="flex flex-row justify-center px-8 mt-2">
          <button
            disabled={ !disabled() }
            className="bg-blue-600 font-bold text-center rounded-md p-2 w-full text-white hover:bg-blue-500 transition-colors disabled:opacity-50">
            Sign in.
          </button>
        </div>

        {
          loginError
          &&
          <AlertForm message={loginError} error/>
        }
      </form>
    </main>
  )
}
