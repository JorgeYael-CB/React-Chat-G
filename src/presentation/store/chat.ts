import { createStore } from 'zustand';
import { MessageInterface } from '../interfaces/messages';


interface Props {
  messages: MessageInterface[],
  setNewMessage: ( message: MessageInterface ) => void;
}


export const ChatStore = createStore<Props>( set => ({
  messages: [],
  setNewMessage: ( message ) => {
    set( prev => ({
      ...prev,
      messages: [...prev.messages, message],
    }))
  }
}))
