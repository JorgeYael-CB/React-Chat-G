import { create } from 'zustand'
import { UserInterface } from '../interfaces/auth'


interface Props {
  user?: UserInterface;
  isLogged: boolean;
  login: (user: UserInterface) => void;
  logout: () => void;
}



export const chatStore = create<Props>( set => ({
  isLogged: false,

  login: ( user ) => {
    set( (state) => ({
      isLogged: true,
      user: user,
    }));
  },

  logout: () => {
    set( () => ({
      user: undefined,
      isLogged: false,
    }));
  }
}))
