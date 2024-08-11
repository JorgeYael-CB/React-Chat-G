import { MessageInterface } from "./message.interface";


export interface MessageDbInterface extends Partial<MessageInterface>{
  _id: string | number;
  id?: string;
}
