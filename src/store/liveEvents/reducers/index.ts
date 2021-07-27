import { LIVE_EVENTS_ACTION_TYPE, LiveEventsAction, LiveEventsState } from '../actions/types'

const INITIAL_STATE: LiveEventsState = {
  top: null,
  loading: false,
}

export const liveEventsReducer = function (state = INITIAL_STATE, action: LiveEventsAction): LiveEventsState {
  switch (action.type) {
    case LIVE_EVENTS_ACTION_TYPE.LIVE_EVENTS_TOP_GET_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case LIVE_EVENTS_ACTION_TYPE.LIVE_EVENTS_TOP_GET_SUCCESS:
      return {
        ...state,
        top: action.data,
        loading: false,
      }
    case LIVE_EVENTS_ACTION_TYPE.LIVE_EVENTS_TOP_GET_FAIL:
      return {
        ...state,
        loading: false,
      }
    case LIVE_EVENTS_ACTION_TYPE.LIVE_EVENTS_CHANGE_LOADER:
      return {
        ...state,
        loading: action.data,
      }
    default:
      return state
  }
}
