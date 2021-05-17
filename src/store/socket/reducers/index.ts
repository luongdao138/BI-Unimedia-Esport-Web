import { State } from '../actions/types'
import { CHAT_ACTION_TYPE } from '@constants/socket.constants'
import { AnyAction } from 'redux'

const initialState: State = {
  roomList: undefined,
}

const socketReducer = (state: State = initialState, action: AnyAction): State => {
  switch (action.type) {
    case CHAT_ACTION_TYPE.GET_ALL_ROOMS:
      return {
        ...state,
        roomList: action.data.content,
      }
    default:
      return state
  }
}

export default socketReducer
