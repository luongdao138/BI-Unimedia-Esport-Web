export enum VIDEO_DETAIL_ACTION_TYPE {
  VIDEO_DETAIL_REQUEST = 'LIVE_EVENTS_TOP_GET_REQUEST',
  VIDEO_DETAIL_SUCCESS = 'LIVE_EVENTS_TOP_GET_SUCCESS',
  VIDEO_DETAIL_FAILURE = 'LIVE_EVENTS_TOP_GET_FAILURE',
  LIVE_EVENTS_REQUEST = 'LIVE_EVENTS_REQUEST',
  LIVE_EVENTS_REQUEST_SUCCESS = 'LIVE_EVENTS_REQUEST_SUCCESS',
  LIVE_EVENTS_REQUEST_FAILURE = 'LIVE_EVENTS_REQUEST_FAILURE',
}

export type VideoDetailAction = {
  type: VIDEO_DETAIL_ACTION_TYPE
  data: any
}

interface Meta {
  pending: boolean
  loaded: boolean
  // eslint-disable-next-line @typescript-eslint/ban-types
  error?: any
}

export type VideoDetailState = {
  detail: any
  meta: Meta
}
