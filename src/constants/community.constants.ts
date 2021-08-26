export const PARTICIPANT_TYPE = {
  HOME: 'home',
  GUEST: 'guest',
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
  JOIN_CONDITION: -1,
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

export const IS_OFFICIAL = {
  NOT_OFFICIAL: 0,
  OFFICIAL: 1,
}

export const STATUS = {
  READY: 'ready',
  CANCELLED: 'cancelled',
}

export const ROLE = {
  ADMIN: 'admin',
  CO_ORGANIZER: 'co_organizer',
  PARTICIPANT: 'participant',
  INTERESTED: 'interested',
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

export const MEMBER_ROLE = {
  SYSTEM: 0,
  ADMIN: 1,
  MEMBER: 2,
  CO_ORGANIZER: 3,
  REPORTED: 4,
  LEAVE: 5,
  REQUESTED: 6,
}
