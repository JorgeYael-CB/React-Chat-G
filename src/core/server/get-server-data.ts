import { envs } from "../../config";
import { MessageDbInterface } from "../../presentation/interfaces/messages";
import { UserDbInterface } from "../../presentation/interfaces/server";


interface Props {
  serverId: string;
  token: string;
}


interface GetServerDataInterface {
  error?: string;
  status: number;
  server?: {
    users: UserDbInterface[],
    messages: MessageDbInterface[],
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
