import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '@store/store'

const getRoot = (state: RootState) => state.settings

export const getFeatures = createSelector(getRoot, (state) => state.userFeatures)
export const getSecuritySettings = createSelector(getRoot, (state) => state.securitySettings)
export const getMessageSettings = createSelector(getRoot, (state) => state.messageSettings)
export const getBlockedUsers = createSelector(getRoot, (state) => state.blockedUsers)
export const getBlockedUsersMeta = createSelector(getRoot, (state) => state.blockedUsersMeta)
export const getNotificationSetting = createSelector(getRoot, (state) =>
  state.notificationSettings.map((s) => ({ id: Number(s.id), name: s.attributes.name, status: s.attributes.status }))
)
export const getPurchaseHistory = createSelector(getRoot, (state) => state.purchaseHistory)
export const getPurchaseHistoryMeta = createSelector(getRoot, (state) => state.purchaseHistoryMeta)
export const getPurchaseHistoryDetail = createSelector(getRoot, (state) => state.purchaseHistoryDetail)
export const cancelPurchase = createSelector(getRoot, (state) => state.cancelPurchase)
