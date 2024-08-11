import { UserInterface } from "../auth"



interface NewUser extends UserInterface {
  _id: string | number;
}

export interface JoinNewUser {
  newUser: NewUser;
  serverId: string;
  serverUuid: string;
  userId: string;
}



