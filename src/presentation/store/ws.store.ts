import { create } from "zustand";
import { envs } from "../../config";
import { ServerStore } from "./serverStore";
import { WsType } from "../interfaces/messages";



const { setOnline } = ServerStore.getState();
const ws = new WebSocket(envs.UrlWss);

ws.onopen = () => {
  setOnline(true);
  console.log('User conectado');
}

ws.onclose = () => {
  setOnline(false);
  console.log('User conectado 2');
}


interface WsStoreInterface {
  addEventListener: <T>( typeMessage: WsType, event: (data: T) => void ) => void;
}


export const WsStore = create<WsStoreInterface>( set => ({
  addEventListener:( typeMessage, event) => {
    ws.addEventListener('message', e => {
      const data = JSON.parse(e.data);
      if( data.type === typeMessage ){
        event(data.payload);
      }
    })
  }
}))
