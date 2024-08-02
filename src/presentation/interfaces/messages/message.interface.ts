

export interface MessageInterface {
  type: string,
  payload: {
    userId: string | number,
    content: string,
    serverId: string,
  }
}
