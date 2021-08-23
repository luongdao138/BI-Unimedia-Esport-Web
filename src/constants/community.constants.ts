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
  SEARCHABLE_VALUE: 0,
  UNSEARCHABLE_VALUE: 1,
  SEARCHABLE: 'searchable',
  UNSEARCHABLE: 'unsearchable',
}

export const JOIN_CONDITION = {
  MANUAL_VALUE: 0,
  AUTOMATIC_VALUE: 1,
  MANUAL: 'manual',
  AUTOMATIC: 'automatic',
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
