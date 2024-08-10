import { UserInterface } from "../auth";


export interface NewUser {
  serverId: string;
  serverUuid: string;
  userId: string;
  newUser: UserInterface;
}
