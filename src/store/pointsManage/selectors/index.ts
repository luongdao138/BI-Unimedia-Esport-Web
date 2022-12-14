import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '@store/store'

const getRoot = (state: RootState) => state.pointsManage

export const getListMyPointData = createSelector(getRoot, (state) => state.list_my_points)
export const getListHistoryPoint = createSelector(getRoot, (state) => state.list_history_points)
export const getListUsedPoint = createSelector(getRoot, (state) => state.list_used_points)
export const getDetailUsagePointsHistory = createSelector(getRoot, (state) => state.detail_usage_points_history)
export const purchaseTicketSuperChatData = createSelector(getRoot, (state) => state.purchase_ticket_super_chat)
export const multiPaymentPurchaseData = createSelector(getRoot, (state) => state.multi_payment)
