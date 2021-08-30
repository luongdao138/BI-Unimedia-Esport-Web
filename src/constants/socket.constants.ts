export const WEBSOCKET_PREFIX = 'WEBSOCKET'
export const WEBSYNC_PREFIX = 'WEBSYNC'
export const WEBSOCKET_STREAM_PREFIX = '@stream/WEBSOCKET'
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
  SYSTEM = 6,
  DATE = 7,
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
  CREATE_ROOM = 'CREATE_ROOM',
  GET_ROOM_AND_MESSAGE = 'GET_ROOM_AND_MESSAGE',
  CHANGE_ROOM_NAME = 'CHANGE_ROOM_NAME',
  ROOM_CHANGED = 'ROOM_CHANGED',
  ADD_MEMBERS = 'ADD_MEMBERS',
  REFRESH_MEMBERS = 'REFRESH_MEMBERS',
  CHANGE_ROOM_IMG = 'CHANGE_ROOM_IMG',
  DELETE_MESSAGE = 'DELETE_MESSAGE',
  MEMBER_ADDED = 'MEMBER_ADDED',
  // non socket event
  CLEAN_ROOM = 'CLEAN_ROOM',
  MESSAGE_PENDING = 'MESSAGE_PENDING',
  MESSAGE_PAGINATING = 'MESSAGE_PAGINATING',
  ROOM_CREATE_PENDING = 'ROOM_CREATE_PENDING',
  CLEAR_NEW_ROOM_ID = 'CLEAR_NEW_ROOM_ID',
  MESSAGE_DELETED = 'MESSAGE_DELETED',
  ROOM_ADD_REMOVE_NOTIFY = 'ROOM_ADD_REMOVE_NOTIFY',
  GET_ROOM_INFO = 'GET_ROOM_INFO',
}

export enum CHAT_PAGING_ACTION_TYPE {
  STORE_LIST = 'STORE_LIST',
  PAGING_ENDED = 'PAGING_ENDED',
  CLEAN_TEMP_LIST = 'CLEAN_TEMP_LIST',
}
//socket

export enum CHAT_ROOM_TYPE {
  CHAT_DIRECT = 0,
  CHAT_ROOM = 1,
  RECRUITMENT = 2,
  TOURNAMENT = 3,
}

export enum CHAT_MESSAGE_TYPE {
  TEXT_MESSAGE = 1,
}

export enum STREAM_CHAT_ACTION_TYPE {
  //socket
  INIT_CONNECTION = '@stream/INIT_CONNECTION',
  GET_MEMBERS = '@stream/GET_MEMBERS',
  GET_MESSAGES = '@stream/GET_MESSAGES',
  SEND_MESSAGE = '@stream/SEND_MESSAGE',
  PLAY_PRESS = '@stream/PLAY_PRESS',
  COUNT_CHANGED = '@stream/COUNT_CHANGED',
  RESET_CONNECTION = '@stream/RESET_CONNECTION',
  ERROR = '@stream/ERROR',
  // INIT_CONNECTION = 'INIT_CONNECTION',
  // GET_MEMBERS = 'GET_MEMBERS',
  // GET_MESSAGES = 'GET_MESSAGES',
  // SEND_MESSAGE = 'SEND_MESSAGE',
  // PLAY_PRESS = 'PLAY_PRESS',
  // COUNT_CHANGED = 'COUNT_CHANGED',
  // RESET_CONNECTION = 'RESET_CONNECTION',
  // ERROR = 'ERROR',
}
export enum TOURNAMENT_SINGLE_ROLE {
  ADMIN = 'admin',
  ORGANIZER = 'co_organizer',
}

export const TOURNAMENT_ADMIN_ROLES = ['admin', 'co_organizer']

export enum ENTRY_TYPE {
  REMOVE = 'REMOVE',
  ADD = 'ADD',
}
