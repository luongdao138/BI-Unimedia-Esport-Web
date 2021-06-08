import { createReducer } from '@reduxjs/toolkit'
import { FriendItem, DmUserData } from '@services/chat.service'
import * as actions from '../actions'

type State = {
  friendList: FriendItem[] | null
  singleUser: DmUserData | null
  redirectDm: string | null
}

const initialState: State = {
  friendList: null,
  singleUser: null,
  redirectDm: null,
}

export default createReducer(initialState, (builder) => {
  builder.addCase(actions.getFriendList.fulfilled, (state, action) => {
    const userFeatures = action.payload.data
    state.friendList = userFeatures
  })
  builder.addCase(actions.directRoomCheck.fulfilled, (state, action) => {
    const userData = action.payload.user
    state.singleUser = userData
    state.redirectDm = action.payload.room
  })
})
