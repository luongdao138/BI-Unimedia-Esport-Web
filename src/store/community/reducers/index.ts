import { createReducer } from '@reduxjs/toolkit'
import * as actions from '../actions'
import { CommunityResponse } from '@services/community.service'

type StateType = {
  my_community_list: Array<CommunityResponse> | null
}

const initialState: StateType = { my_community_list: null }

export default createReducer(initialState, (builder) => {
  builder.addCase(actions.getCommunityList.fulfilled, (state, action) => {
    state.my_community_list = action.payload.data
  })
})
