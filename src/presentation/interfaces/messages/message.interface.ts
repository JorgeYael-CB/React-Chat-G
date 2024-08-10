import { UserInterface } from "../auth"


export interface MessageInterface {
  user: UserInterface,
  server: string,
  content: string,
  id: string,
}
