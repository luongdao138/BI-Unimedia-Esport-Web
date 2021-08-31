export enum PR_ACTION_TYPE {
  PR_DETAIL_GET_REQUEST = 'PR_DETAIL_GET_REQUEST',
  PR_DETAIL_GET_SUCCESS = 'PR_DETAIL_GET_SUCCESS',
  PR_DETAIL_GET_FAIL = 'PR_DETAIL_GET_FAIL',
}

export type PrAction = {
  type: PR_ACTION_TYPE
  data: any
}

export type PrState = {
  detail: any
  uri: any
  loading: boolean
}
