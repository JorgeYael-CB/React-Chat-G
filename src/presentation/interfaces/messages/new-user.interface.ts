

export interface UserChat {
  country: string;
  img: string;
  name: string;
  _id: string;
}

export interface NewUser {
  serverId: string;
  serverUuid: string;
  userId: string;
  newUser: UserChat;
}
