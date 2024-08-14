import { envs } from '../../config';
import { JoinServerInterface } from './join-random-server';


interface Data {
  token: string;
  serverId: string;
}

export async function joinServerById( data: Data ): Promise<JoinServerInterface>{
  try {
    const url = `${envs.apiUrl}/server/join-by-id`;
    const res = await fetch( url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${data.token}`,
      }
    })

    return res.json();
  } catch (error) {
    return {
      status: 500,
      error: 'Unexpected error, try again later.',
    }
  }
}
