import { envs } from "../../config";
import { UserInterface } from "../../presentation/interfaces/auth";
import { MessageInterface } from "../../presentation/interfaces/messages";



interface Props {
  serverId: string;
  token: string;
}


interface GetServerDataInterface {
  error?: string;
  status: number;
  server?: {
    users: UserInterface[],
    messages: MessageInterface[],
    limitUsers: number,
    serverId: string;
    id: string;
    country: string;
  }
}

export const getServerData = async( { serverId, token }: Props ): Promise<GetServerDataInterface> => {
  try {
    const url = `${envs.apiUrl}/server/get-server-data/${serverId}`;
    const data = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    });

    return data.json();
  } catch (error) {
    return {
      status: 500,
      error: 'Unexpected error, please try again later.',
    }
  }
}
