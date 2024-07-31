import { envs } from "../../config"
import { UserInterface } from "../../presentation/interfaces/auth";

interface Response {
  user?: UserInterface,
  status: number,
  error?:string,
}

export const getUser = async( token: string ): Promise<Response> => {
  try {
    const url = `${envs.apiUrl}/auth/get-user-by-id`;
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    });

    return response.json();
  } catch (error) {
    return {
      error: 'Oops!, unexpected error, please try again later.',
      status: 500,
    }
  }
}
