import { createReducer } from '@reduxjs/toolkit'
import * as actions from '../actions'
import { RecommendedUsersResponse } from '@services/home.service'

type StateType = {
  recommendedUser?: RecommendedUsersResponse
}

const initialState: StateType = { recommendedUser: undefined }

export default createReducer(initialState, (builder) => {
  builder.addCase(actions.recommendedUsers.fulfilled, (state, action) => {
    state.recommendedUser = action.payload
  })
})
