export interface State {
  list: any
}

export interface roomItem {
  roomId: string
  userId: number
  clientId: string
  nickName: string
  streamTime: string
  msg: any
}

export enum CHAT_HISTORY_ACTION_TYPE {
  CHAT_HISTORY_PLAY = 'CHAT_HISTORY_PLAY',
  CHAT_HISTORY_CLEAR_LIST = 'CHAT_HISTORY_CLEAR_LIST',
  CHAT_HISTORY_TOP = 'CHAT_HISTORY_TOP',
}
