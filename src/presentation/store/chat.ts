import { create } from 'zustand';
import { MessageInterface, UserChat } from '../interfaces/messages';




interface Props {
  messages: MessageInterface[],
  setNewMessage: ( message: MessageInterface ) => void;
  users: UserChat[],
  setNewUser: ( newUser: UserChat ) => void;
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
