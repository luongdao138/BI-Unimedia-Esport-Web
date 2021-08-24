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
    title: 'common:lobby.entry_confirmation_dialog.title',
    desc: 'common:lobby.entry_confirmation_dialog.desc',
    warningText: 'common:lobby.entry_confirmation_dialog.warningText',
    confirmationText: 'common:lobby.entry_confirmation_dialog.confirmationText',
    cancellationText: 'common:lobby.entry_confirmation_dialog.cancellationText',
  },
  DECLINE_ENTRY: {
    title: 'common:lobby.decline_entry_dialog.title',
    desc: 'common:lobby.decline_entry_dialog.desc',
    warningText: 'common:lobby.decline_entry_dialog.warningText',
    confirmationText: 'common:lobby.decline_entry_dialog.confirmationText',
    cancellationText: 'common:lobby.decline_entry_dialog.cancellationText',
  },
  CONFIRM_MEMBER: {
    shuffle: {
      title: 'common:lobby.confirm_member_dialog.shuffle.title',
      desc: 'common:lobby.confirm_member_dialog.shuffle.desc',
      warningText: 'common:lobby.confirm_member_dialog.shuffle.warningText',
      confirmationText: 'common:lobby.confirm_member_dialog.shuffle.confirmationText',
      cancellationText: 'common:lobby.confirm_member_dialog.shuffle.cancellationText',
    },
    confirm: {
      title: 'common:lobby.confirm_member_dialog.confirm.title',
      desc: 'common:lobby.confirm_member_dialog.confirm.desc',
      warningText: 'common:lobby.confirm_member_dialog.confirm.warningText',
      confirmationText: 'common:lobby.confirm_member_dialog.confirm.confirmationText',
      cancellationText: 'common:lobby.confirm_member_dialog.confirm.cancellationText',
    },
  },
  ENTRY_DEADLINE: {
    title: 'common:lobby.entry_deadline_dialog.title',
    desc: 'common:lobby.entry_deadline_dialog.desc',
    warningText: 'common:lobby.entry_deadline_dialog.warningText',
    confirmationText: 'common:lobby.entry_deadline_dialog.confirmationText',
    cancellationText: 'common:lobby.entry_deadline_dialog.cancellationText',
  },
}
