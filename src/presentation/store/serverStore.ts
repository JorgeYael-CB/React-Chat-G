import { create } from 'zustand';


interface ServerProps {
  serverUuid?: string,
  id?: string;
  serverActive: boolean,
  userOnline: boolean,
  setServerUuid : (serverUuid: string) => void;
  setId: (id: string) => void;
  setOnline: ( value: boolean ) => void;
  setServerActive: ( value: boolean ) => void;
  // TODO: agregar cambio de servidor, etc...
};


export const ServerStore = create<ServerProps>( set => ({
  userOnline: false,
  id: undefined,
  serverUuid: undefined,
  serverActive: false,

  setOnline: (value) => set({userOnline: value}),
  setServerActive: ( value ) => set({serverActive: value}),
  setId: (id: string) => set({ id }),

  setServerUuid: (serverUuid) => {
    set({serverUuid})
  },
}));