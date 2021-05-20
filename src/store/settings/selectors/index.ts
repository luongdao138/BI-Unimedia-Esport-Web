import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '@store/store'

const getRoot = (state: RootState) => state.settings

export const getFeatures = createSelector(getRoot, (state) => state.userFeatures)
export const getSecuritySettings = createSelector(getRoot, (state) => state.securitySettings)
export const getMessageSettings = createSelector(getRoot, (state) => state.messageSettings)
export const getBlockedUsers = createSelector(getRoot, (state) => state.blockedUsers)
export const getBlockedUsersMeta = createSelector(getRoot, (state) => state.blockedUsersMeta)
