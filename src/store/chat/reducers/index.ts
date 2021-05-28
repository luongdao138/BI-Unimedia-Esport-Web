import { createReducer } from '@reduxjs/toolkit'
import { FriendItem } from '@services/chat.service'
import * as actions from '../actions'

type State = {
  friendList: FriendItem[] | null
}

const initialState: State = {
  friendList: null,
}

export default createReducer(initialState, (builder) => {
  builder.addCase(actions.getFriendList.fulfilled, (state, action) => {
    const userFeatures = action.payload.data
    state.friendList = userFeatures
  })
})
