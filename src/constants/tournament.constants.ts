export const PARTICIPATION_TYPES = [
  { label: '個人戦', value: 1 },
  { label: '2on2', value: 2 },
  { label: '3on3', value: 3 },
  { label: '4on4', value: 4 },
  { label: '5on5', value: 5 },
  { label: '6on6', value: 6 },
  { label: '7on7', value: 7 },
  { label: '8on8', value: 8 },
  { label: '9on9', value: 9 },
  { label: '10on10', value: 10 },
]

export const RULES = [
  { label: 'トーナメント', value: 'single' },
  { label: 'バトルロイヤル', value: 'battle_royale' },
]

export const RULE = {
  SINGLE: 'single',
  BATTLE_ROYALE: 'battle_royale',
}

export const PARTICIPANT_TYPE = {
  HOME: 'home',
  GUEST: 'guest',
}

export const T_TYPE = {
  PUBLIC: 't_public',
  PRIVATE: 't_private',
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
