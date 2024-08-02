import { create } from 'zustand';


interface ServerProps {
  serverUuid?: string,
  id?: string;
  serverActive: boolean,
  userOnline: boolean,
  setServerUuid : (serverUuid: string) => void;
  setId: (id: string) => void;
  setOnline: ( value: boolean ) => void;
  // TODO: agregar cambio de servidor, etc...
};


export const ServerStore = create<ServerProps>( set => ({
  setOnline: (value) => {
    set({userOnline: value});
  },
  userOnline: false,
  id: undefined,
  serverUuid: undefined,
  serverActive: true,

  setId: (id) => {
    set({id})
  },

  setServerUuid: (serverUuid) => {
    set({serverUuid})
  },
}));