import { UserInterface } from "../auth";


export interface UserDbInterface extends Partial<UserInterface>{
  _id: string | number;
  id?: string | number;
}
