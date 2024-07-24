import { UserInterface } from "./user.interface";

export interface RegisterUserInterface {
  status: number,
  error?: string;
  user?: UserInterface;
  token?: string;
}