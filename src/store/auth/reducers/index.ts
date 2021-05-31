import { createReducer } from '@reduxjs/toolkit'
import _ from 'lodash'
import * as actions from '../actions'
import * as userProfileActions from '../../userProfile/actions'
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
    .addCase(actions.resendConfirmation.fulfilled, (state, action) => {
      state.user = action.payload
    })
    .addCase(actions.forgotPassword.fulfilled, (state, action) => {
      state.user = action.payload
    })
    .addCase(actions.forgotConfirm.fulfilled, (state, action) => {
      state.user = action.payload
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
