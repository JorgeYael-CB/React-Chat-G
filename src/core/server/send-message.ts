import { envs } from "../../config";


interface Props {
  error?: string;
  status: number;
  data?: {
    userId:string,
    content:string,
    serverId:string,
  }
}

interface Data {
  token:string;
  content: string;
  serverId: string;
}

export const sendMessage = async( data: Data): Promise<Props> => {
  try {
    const url = `${envs.apiUrl}/chat/send-message`;
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${data.token}`,
    },
    body: JSON.stringify(data),
  })

  return res.json();
  } catch (error) {
    return {
      status: 500,
      error: 'Unexpected error, try again later.',
    }
  }
}
