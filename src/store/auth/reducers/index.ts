import { createReducer } from '@reduxjs/toolkit'
import * as actions from '../actions'
import { UserLoginResponse } from '@services/auth.service'

type StateType = {
  user?: UserLoginResponse
}

const initialState: StateType = { user: undefined }

export default createReducer(initialState, (builder) => {
  builder
    .addCase(actions.loginByEmail.fulfilled, (state, action) => {
      state.user = action.payload
    })
    .addCase(actions.loginSocial.fulfilled, (state, action) => {
      state.user = action.payload
    })
    .addCase(actions.registerByEmail.fulfilled, (state, action) => {
      state.user = action.payload
    })
    .addCase(actions.forgotPassword.fulfilled, (state, action) => {
      state.user = action.payload
    })
    .addCase(actions.forgotConfirm.fulfilled, (state, action) => {
      state.user = action.payload
    })
    .addCase(actions.resetPassword.fulfilled, (state, action) => {
      state.user = action.payload
    })
    .addCase(actions.registerConfirm.fulfilled, (state, action) => {
      state.user = action.payload
    })
    .addCase(actions.registerProfile.fulfilled, (state, action) => {
      state.user.nickname = action.payload.data.attributes.nickname
      state.user.user_code = action.payload.data.attributes.user_code
    })
    .addCase(actions.logout.fulfilled, (state) => {
      state.user = undefined
    })
})
