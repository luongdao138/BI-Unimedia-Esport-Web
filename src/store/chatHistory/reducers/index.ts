import { State, CHAT_HISTORY_ACTION_TYPE } from '../actions/types'
import _ from 'lodash'

const initialState: State = {
  list: [],
}

const chatHistoryReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case CHAT_HISTORY_ACTION_TYPE.CHAT_HISTORY_PLAY:
      return {
        ...state,
        list: _.concat(state.list, action.payload),
      }

    case CHAT_HISTORY_ACTION_TYPE.CHAT_HISTORY_CLEAR_LIST:
      return {
        ...state,
        list: [],
      }
    case CHAT_HISTORY_ACTION_TYPE.CHAT_HISTORY_TOP:
      return {
        ...state,
        list: action.payload,
      }

    default:
      return state
  }
}

export default chatHistoryReducer
