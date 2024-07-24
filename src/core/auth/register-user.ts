import { envs } from "../../config";
import { RegisterUserInterface } from "../../presentation/interfaces/auth";


interface Props {
  name:string;
  email:string;
  password:string;
  country?: string;
}


export const registerUser = async( data:Props ):Promise<RegisterUserInterface> => {
  try {
    const url = `${envs.apiUrl}/auth/register-user`;
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
      error: 'Oops!, unexpected error try again later.'
    }
  }
}
