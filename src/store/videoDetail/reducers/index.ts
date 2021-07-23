import { VIDEO_DETAIL_ACTION_TYPE, VideoDetailAction, VideoDetailState } from '../actions/types'

const INITIAL_STATE: VideoDetailState = {
  detail: undefined,
}

export const videoDetailReducer = function (state = INITIAL_STATE, action: VideoDetailAction): VideoDetailState {
  switch (action.type) {
    case VIDEO_DETAIL_ACTION_TYPE.VIDEO_DETAIL_SUCCESS:
      return {
        detail: action.data,
      }
    default:
      return state
  }
}
