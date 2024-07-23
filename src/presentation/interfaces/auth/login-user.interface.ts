import { UserInterface } from "./";

export interface LoginUserInterface {

  status: number;
  error?: string;
  user?: UserInterface;
  token?: string;

};