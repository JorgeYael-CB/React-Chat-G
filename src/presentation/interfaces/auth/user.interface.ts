export type roles = 'USER' | 'ADMIN' | 'SUPER_USER' | 'DEVELOPER';

export interface UserInterface {
  name: string,
  email: string,
  img: string,
  roles: roles[],
  id: string | number,
  active: boolean,
  country: string,
  messages: string[],
  updatedAt: Date,
  createdAt: Date,
};