import { createReducer } from '@reduxjs/toolkit'
import * as actions from '../actions'
// import { TournamentListItem } from '@services/arena.service'
// import { CommonResponse, ProfileResponse, Nickname2, Meta, ChangeEmailSteps, FollowResponse } from '@services/user.service'
// import { registerProfile, logout } from '@store/auth/actions'
// import { blockUser, unblockUser } from '@store/block/actions'
// import { UPLOADER_TYPE } from '@constants/image.constants'
// import { FOLLOW_STATES } from '@constants/common.constants'

type StateType = {
  saved_cards: Array<any>
}

const initialState: StateType = {
  saved_cards: [],
}

export default createReducer(initialState, (builder) => {
  builder.addCase(actions.getSavedCards.fulfilled, (state, action) => {
    state.saved_cards = action.payload.data
  })
})
