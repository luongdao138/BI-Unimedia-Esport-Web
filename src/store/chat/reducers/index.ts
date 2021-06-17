import { createReducer } from '@reduxjs/toolkit'
import { FriendItem, DmUserData, MessageTournamentResponse } from '@services/chat.service'
import * as actions from '../actions'
import { CHAT_ACTION_TYPE } from '@constants/socket.constants'

type State = {
  friendList: FriendItem[] | null
  singleUser: DmUserData | null
  redirectDm: string | null
  tournamentDetail: MessageTournamentResponse
}

const initialState: State = {
  friendList: null,
  singleUser: null,
  redirectDm: null,
  tournamentDetail: undefined,
}

export default createReducer(initialState, (builder) => {
  builder.addCase(actions.getFriendList.fulfilled, (state, action) => {
    const userFeatures = action.payload.data
    state.friendList = userFeatures
  })
  builder.addCase(actions.directRoomCheck.fulfilled, (state, action) => {
    const userData = action.payload.user
    state.singleUser = userData
    state.redirectDm = action.payload.roomId
  })
  builder.addCase(actions.getMessageTournamentDetail.fulfilled, (state, action) => {
    state.tournamentDetail = action.payload
  })
  builder.addCase(CHAT_ACTION_TYPE.CLEAN_ROOM, (state) => {
    state.tournamentDetail = undefined
  })
})
