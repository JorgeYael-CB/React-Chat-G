import { UserInterface } from "../auth"

export interface JoinNewUser {
  type: string,
  payload: {
    userId: string,
    serverUuid: string,
    serverId: string,
    newUser: UserInterface
  }
}


