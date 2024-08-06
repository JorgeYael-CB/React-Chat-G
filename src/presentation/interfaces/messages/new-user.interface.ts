

export interface UserChat {
  country: string;
  img: string;
  name: string;
  _id: string;
}

export interface NewUser {
  serverId: string;
  userId: string;
  newUser: UserChat;
}
