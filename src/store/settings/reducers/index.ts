import * as actions from '../actions'
import {
  UserFeaturesResponse,
  NotificationSettingsResponse,
  PurchaseHistoryResponse,
  PurchaseHistoryDetailResponse,
} from '@services/settings.service'
import { MyPageSettingsResponse, MessageSettingsResponse, UserResponse, Meta } from '@services/settings.service'
import { createReducer } from '@reduxjs/toolkit'

type StateType = {
  userFeatures: UserFeaturesResponse
  securitySettings: MyPageSettingsResponse['data']['attributes']
  messageSettings: MessageSettingsResponse['data']['attributes']
  notificationSettings: NotificationSettingsResponse['data']
  purchaseHistory: PurchaseHistoryResponse['data']
  purchaseHistoryDetail: PurchaseHistoryDetailResponse
  purchaseHistoryMeta?: Meta
  blockedUsers: Array<UserResponse>
  blockedUsersMeta?: Meta
}

const initialState: StateType = {
  userFeatures: [],
  securitySettings: undefined,
  messageSettings: undefined,
  blockedUsers: [],
  notificationSettings: [],
  purchaseHistory: [],
  purchaseHistoryDetail: undefined,
}

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
    .addCase(actions.getNotificationSettings.fulfilled, (state, action) => {
      state.notificationSettings = action.payload.data
    })
    .addCase(actions.getPurchaseHistory.fulfilled, (state, action) => {
      let tmpPurchaseHistory = action.payload.data
      if (action.payload.links.meta != undefined && action.payload.links.meta.current_page > 1) {
        tmpPurchaseHistory = state.purchaseHistory.concat(action.payload.data)
      }
      state.purchaseHistory = tmpPurchaseHistory
      state.purchaseHistoryMeta = action.payload.links.meta
    })
    .addCase(actions.getPurchaseHistoryDetail.fulfilled, (state, action) => {
      state.purchaseHistoryDetail = action.payload
    })
    .addCase(actions.clearPurchaseHistoryDetail, (state) => {
      state.purchaseHistoryDetail = undefined
    })
})
