import { createReducer } from '@reduxjs/toolkit'
import { FriendItem, DmUserData, MessageTournamentResponse } from '@services/chat.service'
import * as actions from '../actions'
import { CHAT_ACTION_TYPE } from '@constants/socket.constants'
import { MESSAGE_ACTION_TYPE, PageMeta } from '../actions/types'

type State = {
  friendList: FriendItem[] | null
  singleUser: DmUserData | null
  redirectDm: string | null
  tournamentDetail: MessageTournamentResponse
  friendListMeta: PageMeta
}

const initialState: State = {
  friendList: null,
  singleUser: null,
  redirectDm: null,
  tournamentDetail: undefined,
  friendListMeta: undefined,
}

export default createReducer(initialState, (builder) => {
  builder.addCase(actions.getFriendList.fulfilled, (state, action) => {
    let userFeatures = action.payload.data
    if (action.payload.links?.meta != undefined && action.payload.links.meta.current_page > 1) {
      userFeatures = state.friendList.concat(action.payload.data)
    }
    state.friendList = userFeatures
    state.friendListMeta = action.payload.links.meta
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
  builder.addCase(MESSAGE_ACTION_TYPE.RESET_ADD_USERS, (state) => {
    state.friendList = undefined
    state.friendListMeta = undefined
  })
})
