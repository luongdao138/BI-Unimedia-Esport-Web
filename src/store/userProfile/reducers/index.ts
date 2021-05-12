import { createReducer } from '@reduxjs/toolkit'
import { ProfileResponse } from '@services/user.service'
import * as actions from '../actions'

type StateType = {
  detail: ProfileResponse
}

const initialState: StateType = { detail: undefined }

export default createReducer(initialState, (builder) => {
  builder.addCase(actions.getUserProfile.fulfilled, (state, action) => {
    state.detail = action.payload
  })
})
