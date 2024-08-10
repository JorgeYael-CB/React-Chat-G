
export interface JoinNewUser {
  type: string,
  payload: {
    userId: string,
    serverUuid: string,
    serverId: string,
    newUser: {
      _id: string,
      name: string,
      img: string,
      country: string,
    }
  }
}


