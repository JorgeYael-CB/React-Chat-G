import { envs } from '../../config';


interface User {
  _id:string,
  name:string,
  img:string,
  country:string,
}

interface JoinRandomServer {
  server?: {
    messages: string[],
    limitUsers: number,
    serverId: string,
    id: string,
    country: string,
    users: User[],
  },
  status: number,
  error?: string,
}

export const joinRandomServer = async( token: string ):Promise<JoinRandomServer> => {
  try {
    const url = `${envs.apiUrl}/server/join-random-server`;
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    return res.json();
  } catch (error) {
    return {
      error: `Oops!, unexpected error, try again later.`,
      status: 500,
    }
  }
};
