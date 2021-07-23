export interface State {
  currentRoom: string | undefined
  msgList: any
  roomCount: any
  connected: boolean
}

export interface roomItem {
  roomId: string
  userId: number
  clientId: string
  nickName: string
  streamTime: string
  msg: any
}
