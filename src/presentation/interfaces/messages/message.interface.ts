import { roles } from "../auth"


export interface MessageInterface {
  user: {
    _id: string,
    name: string,
    img: string,
    roles: roles[],
    active: boolean,
    country: string
  },
  server: string,
  content: string,
  id: string,
}
