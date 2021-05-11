import { createReducer } from '@reduxjs/toolkit'
import * as actions from '../actions'

type StateType = {
  detail: any | null
}

const initialState: StateType = { detail: undefined }

export default createReducer(initialState, (builder) => {
  builder.addCase(actions.getUserProfile.fulfilled, (state, action) => {
    state.detail = action.payload
  })
})
