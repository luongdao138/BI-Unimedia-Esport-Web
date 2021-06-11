export enum COMMON_ACTION_TYPE {
  GET_PREFECTURES = 'common/getPrefectures',
  GET_HARDWARES = 'common/getHardwares',
}

export type Dialog = {
  message?: string | null
  title?: string | null
  actionMsg?: string | null
  actions: ActionButtons[]
}
export interface ActionButtons {
  name: string
  action: string
  type: string
}
