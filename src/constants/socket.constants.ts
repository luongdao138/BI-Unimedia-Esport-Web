export const WEBSOCKET_PREFIX = 'WEBSOCKET'
export const WEBSYNC_PREFIX = 'WEBSYNC'
export default {
  WEBSOCKET_PREFIX,
}
export enum CHAT_MESSAGE_TYPE {
  WELCOME = 0,
  TEXT = 1,
  IMAGE = 2,
  AUDIO = 3,
  VIDEO = 4,
  LINK = 5,
}

export enum CHAT_ACTION_TYPE {
  //socket
  GET_ALL_ROOMS = 'GET_ALL_ROOMS',
  GET_ROOM_MESSAGES = 'GET_ROOM_MESSAGES',
}
