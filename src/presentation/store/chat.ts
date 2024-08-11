import { create } from 'zustand';
import { MessageInterface } from '../interfaces/messages';
import { UserInterface } from '../interfaces/auth/user.interface';




interface Props {
  messages: MessageInterface[],
  setNewMessage: ( message: MessageInterface ) => void;
  users: UserInterface[],
  setNewUser: ( newUser: UserInterface ) => void;
}


export const ChatStore = create<Props>( set => ({
  users: [],
  setNewUser: ( newUser ) => {
    set( prev => ({users: {...prev.users, newUser}}));
  },
  messages: [],
  setNewMessage: ( message ) => {
    set( prev => ({
      ...prev,
      messages: [...prev.messages, message],
    }));
  }
}))
