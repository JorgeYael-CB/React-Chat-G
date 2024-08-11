import { UserDbInterface } from "../server";


export interface MessageInterface {
  user: UserDbInterface,
  server: string,
  content: string,
  id: string,
  createdAt: Date,
  updatedAt: Date,
  serverUuid: string;
}