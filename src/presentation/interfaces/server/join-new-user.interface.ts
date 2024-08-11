import { UserDbInterface } from "./";




export interface JoinNewUser {
  newUser: UserDbInterface;
  serverId: string;
  serverUuid: string;
  userId: string;
}



