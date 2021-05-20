import * as actions from '../actions'
import { UserFeaturesResponse } from '@services/settings.service'
import { SecuritySettingsResponse } from '@services/settings.service'
import { createReducer } from '@reduxjs/toolkit'

type StateType = {
  userFeatures: UserFeaturesResponse
  securitySettings: SecuritySettingsResponse['data']['attributes']
}

const initialState: StateType = { userFeatures: [], securitySettings: undefined }

export default createReducer(initialState, (builder) => {
  builder
    .addCase(actions.getFeatures.fulfilled, (state, action) => {
      const userFeatures = action.payload
      state.userFeatures = userFeatures
    })
    .addCase(actions.getSecuritySettings.fulfilled, (state, action) => {
      state.securitySettings = action.payload.data.attributes
    })
})
