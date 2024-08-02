import { MessageInterface } from "./message.interface";


export interface MessageServerInterface {
  type: string,
  payload: MessageInterface,
}
