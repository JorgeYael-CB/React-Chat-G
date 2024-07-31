import { create } from 'zustand';


interface ServerProps {
  serverUuid?: string,
  id?: string;
  serverActive: boolean,
  setServerUuid : (serverUuid: string) => void;
  setId: (id: string) => void;
  // TODO: agregar cambio de servidor, etc...
};


export const ServerStore = create<ServerProps>( set => ({
  id: undefined,
  serverUuid: undefined,
  serverActive: false,

  setId: (id) => {
    set( (data) => ({
      ...data,
      id,
    }))
  },

  setServerUuid: (serverUuid) => {
    set( data => ({
      ...data,
      serverUuid: serverUuid,
    }))
  },
}));