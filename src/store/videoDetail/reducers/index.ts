import { VIDEO_DETAIL_ACTION_TYPE, VideoDetailAction, VideoDetailState } from '../actions/types'

const INITIAL_STATE: VideoDetailState = {
  detail: undefined,
  pr_detail: null,
  meta: {
    pending: false,
    loaded: false,
  },
}

export const videoDetailReducer = function (state = INITIAL_STATE, action: VideoDetailAction): VideoDetailState {
  switch (action.type) {
    case VIDEO_DETAIL_ACTION_TYPE.VIDEO_DETAIL_SUCCESS:
      return {
        ...state,
        detail: action.data,
        meta: {
          pending: false,
          loaded: true,
        },
      }
    case VIDEO_DETAIL_ACTION_TYPE.VIDEO_DETAIL_REQUEST:
      return {
        ...state,
        meta: {
          pending: true,
          loaded: false,
        },
      }
    case VIDEO_DETAIL_ACTION_TYPE.VIDEO_DETAIL_FAILURE:
      return {
        ...state,
        meta: {
          pending: false,
          loaded: false,
          error: action.data,
        },
      }
    case VIDEO_DETAIL_ACTION_TYPE.PR_DETAIL_GET_REQUEST:
      return {
        ...state,
        meta: {
          pending: true,
          loaded: false,
        },
      }
    case VIDEO_DETAIL_ACTION_TYPE.PR_DETAIL_GET_SUCCESS:
      return {
        ...state,
        pr_detail: action.data,
        meta: {
          pending: false,
          loaded: true,
        },
      }
    case VIDEO_DETAIL_ACTION_TYPE.PR_DETAIL_GET_FAIL:
      return {
        ...state,
        meta: {
          pending: false,
          loaded: false,
          error: action.data,
        },
      }
    default:
      return state
  }
}
