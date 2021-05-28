export enum METADATA_ACTION_TYPE {
  CLEAR_METADATA = 'meta/metadata/clear',
}

export type Meta = {
  pending: boolean
  loaded: boolean
  error: boolean | Record<string, any>
}
