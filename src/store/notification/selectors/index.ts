import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '@store/store'

const getRoot = (state: RootState) => state.notification

export const getNotificationList = createSelector(getRoot, (state) => state.notifications)
export const getNotificationBadgeList = createSelector(getRoot, (state) => state.notificationBarList)
export const getNotificationListMeta = createSelector(getRoot, (state) => state.notificationsMeta)
export const getNotificationBadge = createSelector(getRoot, (state) => state.notificaitonBadge)
export const getNotificationDetail = createSelector(getRoot, (state) => state.notificaitonDetail)
