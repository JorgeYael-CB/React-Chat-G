import { create } from 'zustand';


interface ServerProps {
  userOnline: boolean,
  setOnline: ( value: boolean ) => void;
  // TODO: agregar cambio de servidor, etc...
};


export const ServerStore = create<ServerProps>( set => ({
  userOnline: false,

  setOnline: (value) => set({userOnline: value}),
}));