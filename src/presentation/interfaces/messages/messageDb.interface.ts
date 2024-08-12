import { MessageInterface } from "./message.interface";


export interface MessageDbInterface extends Omit<MessageInterface, 'id'>{
  _id: string | number;
  id?: string;
}
