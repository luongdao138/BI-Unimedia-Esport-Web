import { createReducer } from '@reduxjs/toolkit'
import { FriendItem } from '@services/chat.service'
import * as actions from '../actions'

type State = {
  friendList: FriendItem[] | null
  singleUser: any // change later
}

const initialState: State = {
  friendList: null,
  singleUser: null,
}

export default createReducer(initialState, (builder) => {
  builder.addCase(actions.getFriendList.fulfilled, (state, action) => {
    const userFeatures = action.payload.data
    state.friendList = userFeatures
  })
  builder.addCase(actions.directRoomCheck.fulfilled, (state, action) => {
    const userData = action.payload.data.userData
    state.singleUser = userData
  })
})
