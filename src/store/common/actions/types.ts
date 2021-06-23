export enum COMMON_ACTION_TYPE {
  GET_PREFECTURES = 'common/getPrefectures',
  GET_HARDWARES = 'common/getHardwares',
  SET_NOT_FOUND = 'SET_NOT_FOUND',
}

export type Dialog = {
  message?: string | null
  title?: string | null
  actionMsg?: string | null
  actionText?: string | null
  actions: ActionButtons[]
}
export interface ActionButtons {
  name: string
  action: string
  type: string
}

export enum NotFoundType {
  USER_NOT_FOUND = 1,
  ARENA_NOT_FOUND = 2,
}
