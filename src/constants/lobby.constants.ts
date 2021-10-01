import i18n from '@locales/i18n'
import { LobbyFilterItem, LobbyFilterOption } from '@services/lobby.service'

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

export const LOBBY_DIALOGS = {
  ENTRY_CONFIRMATION: {
    title: i18n.t('common:lobby.entry_confirmation_dialog.title'),
    description: i18n.t('common:lobby.entry_confirmation_dialog.description'),
    additionalText: i18n.t('common:lobby.entry_confirmation_dialog.additionalText'),
    confirmationText: i18n.t('common:lobby.entry_confirmation_dialog.confirmationText'),
    cancellationText: i18n.t('common:lobby.entry_confirmation_dialog.cancellationText'),
  },
  DECLINE_ENTRY: {
    title: i18n.t('common:lobby.decline_entry_dialog.title'),
    description: i18n.t('common:lobby.decline_entry_dialog.description'),
    additionalText: i18n.t('common:lobby.decline_entry_dialog.additionalText'),
    confirmationText: i18n.t('common:lobby.decline_entry_dialog.confirmationText'),
    cancellationText: i18n.t('common:lobby.decline_entry_dialog.cancellationText'),
  },
  CONFIRM_MEMBER: {
    shuffle: {
      title: i18n.t('common:lobby.confirm_member_dialog.shuffle.title'),
      description: i18n.t('common:lobby.confirm_member_dialog.shuffle.description'),
      additionalText: i18n.t('common:lobby.confirm_member_dialog.shuffle.additionalText'),
      confirmationText: i18n.t('common:lobby.confirm_member_dialog.shuffle.confirmationText'),
      cancellationText: i18n.t('common:lobby.confirm_member_dialog.shuffle.cancellationText'),
    },
    confirm: {
      title: i18n.t('common:lobby.confirm_member_dialog.confirm.title'),
      description: i18n.t('common:lobby.confirm_member_dialog.confirm.description'),
      additionalText: i18n.t('common:lobby.confirm_member_dialog.confirm.additionalText'),
      confirmationText: i18n.t('common:lobby.confirm_member_dialog.confirm.confirmationText'),
      cancellationText: i18n.t('common:lobby.confirm_member_dialog.confirm.cancellationText'),
    },
  },
  CANCEL_LOBBY: {
    title: i18n.t('common:lobby.cancel_lobby_dialog.title'),
    additionalText: i18n.t('common:lobby.cancel_lobby_dialog.additionalText'),
    confirmationText: i18n.t('common:lobby.cancel_lobby_dialog.confirmationText'),
    cancellationText: i18n.t('common:lobby.cancel_lobby_dialog.cancellationText'),
  },
  DISCARD_LOBBY: {
    title: i18n.t('common:lobby.discard.title'),
    confirmationText: i18n.t('common:lobby.discard.confirm'),
    cancellationText: i18n.t('common:lobby.cancel_lobby_dialog.cancellationText'),
  },
}

export const lobbyFilterOptions: LobbyFilterItem[] = [
  {
    type: LobbyFilterOption.all,
    label: i18n.t('common:lobby.search.filter.all'),
    loginRequired: false,
  },
  {
    type: LobbyFilterOption.ready,
    label: i18n.t('common:lobby.search.filter.ready'),
    loginRequired: false,
  },
  {
    type: LobbyFilterOption.recruiting,
    label: i18n.t('common:lobby.search.filter.recruiting'),
    loginRequired: false,
  },
  {
    type: LobbyFilterOption.entry_closed,
    label: i18n.t('common:lobby.search.filter.entry_closed'),
    loginRequired: false,
  },
  {
    type: LobbyFilterOption.in_progress,
    label: i18n.t('common:lobby.search.filter.in_progress'),
    loginRequired: false,
  },
  {
    type: LobbyFilterOption.ended,
    label: i18n.t('common:lobby.search.filter.ended'),
    loginRequired: false,
  },
  {
    type: LobbyFilterOption.suggested,
    label: i18n.t('common:lobby.search.filter.suggested'),
    loginRequired: true,
  },
  {
    type: LobbyFilterOption.joined,
    label: i18n.t('common:lobby.search.filter.joined'),
    loginRequired: true,
  },
  {
    type: LobbyFilterOption.organized,
    label: i18n.t('common:lobby.search.filter.organized'),
    loginRequired: true,
  },
]
