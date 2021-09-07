import { AppDispatch } from '@store/store'
import { CHAT_HISTORY_ACTION_TYPE } from './types'

export const chatHistoryActions = {
  chatPlay: (payload: any) => {
    return (dispatch: AppDispatch) => {
      dispatch(historyCreators.chatPlay(payload))
    }
  },
  chatListClear: () => {
    return (dispatch: AppDispatch) => {
      dispatch(historyCreators.chatListClear())
    }
  },
  chatTop: (payload: any) => {
    return (dispatch: AppDispatch) => {
      dispatch(historyCreators.chatTop(payload))
    }
  },
}

export const historyCreators = {
  chatPlay: (payload: any) => ({
    type: CHAT_HISTORY_ACTION_TYPE.CHAT_HISTORY_PLAY,
    payload: payload,
  }),
  chatListClear: () => ({
    type: CHAT_HISTORY_ACTION_TYPE.CHAT_HISTORY_CLEAR_LIST,
  }),
  chatTop: (payload: any) => ({
    type: CHAT_HISTORY_ACTION_TYPE.CHAT_HISTORY_TOP,
    payload: payload,
  }),
}
