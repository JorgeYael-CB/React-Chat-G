import { envs } from "../../config";


interface Props {
}


export const loginUser = async ( data: Props ) => {
  const url = `${envs.apiUrl}/auth/login-user`;
};
