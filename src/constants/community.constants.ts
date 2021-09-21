export const PARTICIPANT_TYPE = {
  HOME: 'home',
  GUEST: 'guest',
}

export enum TABS {
  INFO,
  TOPIC_LIST,
  SEARCH,
}

export const T_TYPE = {
  PUBLIC: 0,
  PRIVATE: 1,
}

export const INITIAL_VALUES = {
  COVER_IMAGE_URL: '',
  NAME: '',
  DESCRIPTION: '',
  ADDRESS: '',
  AREA_ID: 1,
  OPEN_RANGE: 0,
  JOIN_CONDITION: 1,
  FEATURES: [],
  GAME_TITLES: [],
}

export const OPEN_RANGE = {
  SEARCHABLE: 0,
  UNSEARCHABLE: 1,
}

export const JOIN_CONDITION = {
  MANUAL: 0,
  AUTOMATIC: 1,
}

export enum OFFICIAL {
  NOT_OFFICIAL,
  OFFICIAL,
}

export const STATUS = {
  READY: 'ready',
  CANCELLED: 'cancelled',
}

export const MEMBER_ROLE = {
  SYSTEM: 0,
  ADMIN: 1,
  MEMBER: 2,
  CO_ORGANIZER: 3,
  REPORTED: 4,
  LEAVE: 5,
  REQUESTED: 6,
  ON_HOLD: 7,
  NOT_MEMBER: 8,
}

export const COMMUNITY_STATUS = {
  CANCELLED: 'cancelled',
  READY: 'ready',
}

export const TOPIC_STATUS = {
  ALL: 'all',
  MINE: 'mine',
  NEW: 'new',
}

// width to character_count divisor for font size 12
export const TOPIC_ROW_ITEM_DIVISOR = {
  NORMAL: 5.65,
  JAPANESE: 12,
  CHARACTER_BEFORE_KEYWORD: 10,
}

export const CARD_TAG = {
  THREE_DOT_SPACE: 21,
}
