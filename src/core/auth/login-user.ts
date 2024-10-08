import { envs } from "../../config";
import { LoginUserInterface } from "../../presentation/interfaces/auth";


interface Props {
  name?:string;
  email?:string;
  password:string;
}


export const loginUser = async ( data: Props ):Promise<LoginUserInterface> => {
  try {
    const url = `${envs.apiUrl}/auth/login-user`;
    const res = await fetch( url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify( data ),
    });

    return await res.json();
  } catch (error) {
    return {
      status: 500,
      error: 'Oops!, unexpected error, please try again later.',
    }
  }
};
