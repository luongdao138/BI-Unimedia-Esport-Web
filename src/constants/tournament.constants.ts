import { TournamentFilterOption } from '@services/arena.service'
import i18n from '@locales/i18n'

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
  { label: 'スコアアタック', value: 'score_attack' },
  { label: 'タイムアタック', value: 'time_attack' },
]

export const SORTING_METHOD = [
  { label: '昇順', value: 'by_asc' },
  { label: '降順', value: 'by_desc' },
]
export const LIVE_CATEGORIES = [
  { label: 'カテゴリーを選択', value: 1 },
  { label: 'ゲーム：ゲームタイトル', value: 2 },
  { label: 'ゲーム：ゲームタイトル', value: 3 },
  { label: 'その他：雑談', value: 4 },
]

export const T_TYPES = [
  { label: '公開', value: 0 },
  { label: '限定公開', value: 1 },
]

export const RULE = {
  SINGLE: 'single',
  BATTLE_ROYALE: 'battle_royale',
  SCORE_ATTACK: 'score_attack',
  TIME_ATTACK: 'time_attack',
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

export const defaultFilterOptions = [
  {
    type: TournamentFilterOption.all,
    label: i18n.t('common:arenaSearchFilters.all'),
    loginRequired: false,
  },
  {
    type: TournamentFilterOption.ready,
    label: i18n.t('common:arenaSearchFilters.ready'),
    loginRequired: false,
  },
  {
    type: TournamentFilterOption.recruiting,
    label: i18n.t('common:arenaSearchFilters.recruiting'),
    loginRequired: false,
  },
  {
    type: TournamentFilterOption.beforeStart,
    label: i18n.t('common:arenaSearchFilters.beforeStart'),
    loginRequired: false,
  },
  {
    type: TournamentFilterOption.inProgress,
    label: i18n.t('common:arenaSearchFilters.inProgress'),
  },
  {
    type: TournamentFilterOption.completed,
    label: i18n.t('common:arenaSearchFilters.completed'),
    loginRequired: false,
  },
]

export const loginRequiredFilterOptions = [
  {
    type: TournamentFilterOption.joined,
    label: i18n.t('common:arenaSearchFilters.joined'),
    loginRequired: true,
  },
  {
    type: TournamentFilterOption.organized,
    label: i18n.t('common:arenaSearchFilters.organized'),
    loginRequired: true,
  },
]

export const TOURNAMENT_DIALOGS = {
  DISCARD_TOURNAMENT: {
    title: i18n.t('common:tournament.discard.title'),
    confirmationText: i18n.t('common:tournament.discard.confirm'),
    cancellationText: i18n.t('common:common.cancel'),
  },
}
