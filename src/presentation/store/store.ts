import { create } from 'zustand'
import { UserInterface } from '../interfaces/auth'
import { persist } from 'zustand/middleware';


interface Props {
  user?: {
    name: string,
    id: number | string,
  };
  token?: string;
  isLogged: boolean;
  login: (user: UserInterface, token: string) => void;
  logout: () => void;
}



export const store = create(persist<Props>(set => ({
  isLogged: false,

  login: ( user, token ) => {
    set( () => ({
      isLogged: true,
      user: {id: user.id, name: user.name},
      token: token,
    }));
  },

  logout: () => {
    set( () => ({
      user: undefined,
      isLogged: false,
      token: undefined,
    }));
  }
}),
  {
    name: 'chat-g',
  }
));