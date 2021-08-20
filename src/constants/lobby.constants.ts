// TEMPORARY: battle royale removed
export const PARTICIPANT_TYPE = {
  HOME: 'home',
  GUEST: 'guest',
}

export const T_TYPE = {
  PUBLIC: 't_public',
  PRIVATE: 't_private',
}

export const RULE = {
  SINGLE: 'single',
  BATTLE_ROYALE: 'battle_royale',
}

export const STATUS = {
  READY: 'ready',
  RECRUITING: 'recruiting',
  RECRUITMENT_CLOSED: 'recruitment_closed',
  READY_TO_START: 'ready_to_start',
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
}

export const ROLE = {
  ADMIN: 'admin',
  CO_ORGANIZER: 'co_organizer',
  PARTICIPANT: 'participant',
  INTERESTED: 'interested',
}

export const TOURNAMENT_STATUS = {
  IN_PROGRESS: 'in_progress',
  CANCELLED: 'cancelled',
  COMPLETED: 'completed',
  READY: 'ready',
  READY_TO_START: 'ready_to_start',
  RECRUITING: 'recruiting',
  RECRUITMENT_CLOSED: 'recruitment_closed',
}

export enum LOBBY_STATUS {
  READY = 0,
  RECRUITING = 1,
  ENTRY_CLOSED = 2,
  IN_PROGRESS = 3,
  ENDED = 4,
  CANCELLED = 5,
  DELETED = 6,
}

export enum LOBBY_PARTICIPANT_STATUS {
  ENTERED = 0,
  SELECTED = 1,
  NOT_SELECTED = 2,
}

export enum MAIN_ACTIONS {
  ENTRY = 1,
  DECLINE = 2,
  CANCEL = 3,
  MEMBER_CONFIRM = 4,
}
