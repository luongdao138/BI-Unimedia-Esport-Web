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
  DATE = 6,
}

export enum CHAT_MEMBER_TYPE {
  CHAT_ADMIN = 1,
  CHAT_MEMBER = 0,
}

export enum CHAT_MEMBER_STATUS {
  ACTIVE = 1,
  INACTIVE = 0,
}

export enum CHAT_ACTION_TYPE {
  //socket
  GET_ALL_ROOMS = 'GET_ALL_ROOMS',
  GET_ROOM_MESSAGES = 'GET_ROOM_MESSAGES',
  GET_ROOM_MEMBERS = 'GET_ROOM_MEMBERS',
  REMOVE_MEMBER = 'REMOVE_MEMBER',
  MEMBER_REMOVED = 'MEMBER_REMOVED',
  SEND_MESSAGE = 'SEND_MESSAGE',
  // non socket event
  CLEAN_ROOM = 'CLEAN_ROOM',
  MESSAGE_PENDING = 'MESSAGE_PENDING',
  MESSAGE_PAGINATING = 'MESSAGE_PAGINATING',
}
