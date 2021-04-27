import { createReducer } from '@reduxjs/toolkit'
import * as actions from '../actions'
import { UserLoginResponse } from '@services/auth.service'

type StateType = {
  user?: UserLoginResponse
}

const initialState: StateType = { user: undefined }

export default createReducer(initialState, (builder) => {
  builder.addCase(actions.loginByEmail.fulfilled, (state, action) => {
    state.user = action.payload
  })
})
