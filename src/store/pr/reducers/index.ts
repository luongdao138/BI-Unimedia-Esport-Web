import { PR_ACTION_TYPE, PrAction, PrState } from '../actions/types'

const INITIAL_STATE: PrState = {
  detail: null,
  uri: null,
  loading: false,
}

export const prReducer = function (state = INITIAL_STATE, action: PrAction): PrState {
  switch (action.type) {
    case PR_ACTION_TYPE.PR_DETAIL_GET_REQUEST:
      return {
        ...state,
        uri: null,
        loading: true,
      }
    case PR_ACTION_TYPE.PR_DETAIL_GET_SUCCESS:
      return {
        ...state,
        uri: null,
        detail: action.data,
        loading: false,
      }
    case PR_ACTION_TYPE.PR_DETAIL_GET_FAIL:
      return {
        ...state,
        loading: false,
      }
    default:
      return state
  }
}
