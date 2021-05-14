import { createReducer } from '@reduxjs/toolkit'
import _ from 'lodash'
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
      const newUser = _.pick(action.payload.data.attributes, ['nickname', 'user_code'])
      state.user = { ...state.user, ...newUser }
    })
})
