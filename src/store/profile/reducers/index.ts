import { createReducer } from '@reduxjs/toolkit'
import * as actions from '../actions'
import { ProfileUpdateResponse } from '@services/profile.service'

type StateType = {
  profile?: ProfileUpdateResponse
}

const initialState: StateType = { profile: undefined }

export default createReducer(initialState, (builder) => {
  builder.addCase(actions.profileUpdate.fulfilled, (state, action) => {
    state.profile = action.payload
  })
})
