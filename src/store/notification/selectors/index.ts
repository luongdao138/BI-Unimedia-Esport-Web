import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '@store/store'

const getRoot = (state: RootState) => state.notification

export const getNotificationList = createSelector(getRoot, (state) => state.my_notification_list)
export const getNotificationListMeta = createSelector(getRoot, (state) => state.my_notification_list_meta)
