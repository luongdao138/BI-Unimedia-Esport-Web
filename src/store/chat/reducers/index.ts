import { createReducer } from '@reduxjs/toolkit'
import { FriendItem, DmUserData, MessageTournamentResponse, MessageLobbyResponse } from '@services/chat.service'
import * as actions from '../actions'
import { CHAT_ACTION_TYPE } from '@constants/socket.constants'
import { MESSAGE_ACTION_TYPE } from '../actions/types'
import { getMemberProfile } from '@store/userProfile/actions'

type State = {
  friendList: FriendItem[] | null
  singleUser: DmUserData | null
  redirectDm: string | null
  tournamentDetail?: MessageTournamentResponse
  lobbyDetail?: MessageLobbyResponse
}

const initialState: State = {
  friendList: null,
  singleUser: null,
  redirectDm: null,
}

export default createReducer(initialState, (builder) => {
  builder.addCase(actions.getFriendList.fulfilled, (state, action) => {
    state.friendList = action.payload.data
  })
  builder.addCase(actions.directRoomCheck.fulfilled, (state, action) => {
    const userData = action.payload.user
    state.singleUser = userData
    state.redirectDm = action.payload.roomId
  })
  builder.addCase(actions.getMessageTournamentDetail.fulfilled, (state, action) => {
    state.tournamentDetail = action.payload
  })
  builder.addCase(actions.getMessageLobbyDetail.fulfilled, (state, action) => {
    state.lobbyDetail = action.payload
  })
  builder.addCase(CHAT_ACTION_TYPE.CLEAN_ROOM, (state) => {
    state.tournamentDetail = undefined
  })
  builder.addCase(MESSAGE_ACTION_TYPE.RESET_ADD_USERS, (state) => {
    state.friendList = undefined
  })
  builder.addCase(MESSAGE_ACTION_TYPE.RESET_DM_ROOM, (state) => {
    state.redirectDm = null
    state.singleUser = null
  })
  builder.addCase(getMemberProfile.fulfilled, (state) => {
    state.redirectDm = null
    state.singleUser = null
  })
})
