import { createReducer } from '@reduxjs/toolkit'
import _ from 'lodash'
import * as actions from '../actions'
import * as userProfileActions from '../../userProfile/actions'
import { UserLoginResponse } from '@services/auth.service'

type StateType = {
  user?: UserLoginResponse
  confirmType?: 'register' | 'forgot'
  registerLoading: boolean
}

const initialState: StateType = {
  registerLoading: false,
}

export default createReducer(initialState, (builder) => {
  builder
    .addCase(actions.loginByEmail.fulfilled, (state, action) => {
      state.user = action.payload
    })
    .addCase(actions.loginSocial.fulfilled, (state, action) => {
      state.user = action.payload
    })
    .addCase(actions.registerByEmail.pending, (state) => {
      state.registerLoading = true
    })
    .addCase(actions.registerByEmail.fulfilled, (state, action) => {
      state.user = action.payload
      state.confirmType = 'register'
      state.registerLoading = false
    })
    .addCase(actions.registerByEmail.rejected, (state) => {
      state.registerLoading = false
    })
    .addCase(actions.forgotPassword.fulfilled, (state, action) => {
      state.user = action.payload
      state.confirmType = 'forgot'
    })
    .addCase(actions.forgotConfirm.fulfilled, (state, action) => {
      state.user = action.payload
    })
    .addCase(actions.resetPassword.fulfilled, (state, action) => {
      const newUser = _.pick(action.payload, [
        'id',
        'email',
        'nickname',
        'avatar_url',
        'updateStep',
        'user_code',
        'accessToken',
        'refreshToken',
        'is_social',
        'sign_in_count',
      ])
      state.user = { ...state.user, ...newUser }
    })
    .addCase(actions.registerConfirm.fulfilled, (state, action) => {
      state.user = action.payload
    })
    .addCase(actions.registerProfile.fulfilled, (state, action) => {
      const newUser = _.pick(action.payload.data.attributes, ['nickname', 'user_code'])
      state.user = { ...state.user, ...newUser }
    })
    .addCase(actions.logout.fulfilled, (state) => {
      state.user = undefined
    })
    .addCase(userProfileActions.changeEmailConfirm.fulfilled, (state, action) => {
      state.user.email = action.payload.email
    })
})
