import * as actions from '../actions'
import { UserFeaturesResponse } from '@services/settings.service'
import { MyPageSettingsResponse, MessageSettingsResponse, UserResponse, Meta } from '@services/settings.service'
import { createReducer } from '@reduxjs/toolkit'

type StateType = {
  userFeatures: UserFeaturesResponse
  securitySettings: MyPageSettingsResponse['data']['attributes']
  messageSettings: MessageSettingsResponse['data']['attributes']
  blockedUsers: Array<UserResponse>
  blockedUsersMeta?: Meta
}

const initialState: StateType = { userFeatures: [], securitySettings: undefined, messageSettings: undefined, blockedUsers: [] }

export default createReducer(initialState, (builder) => {
  builder
    .addCase(actions.getFeatures.fulfilled, (state, action) => {
      const userFeatures = action.payload
      state.userFeatures = userFeatures
    })
    .addCase(actions.getSecuritySettings.fulfilled, (state, action) => {
      state.securitySettings = action.payload.data.attributes
    })
    .addCase(actions.getMessageSettings.fulfilled, (state, action) => {
      state.messageSettings = action.payload.data.attributes
    })
    .addCase(actions.getBlockedUsers.fulfilled, (state, action) => {
      let tmpUsers = action.payload.data
      if (action.payload.meta != undefined && action.payload.meta.current_page > 1) {
        tmpUsers = state.blockedUsers.concat(action.payload.data)
      }

      state.blockedUsers = tmpUsers
      state.blockedUsersMeta = action.payload.meta
    })
})
