import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '@store/store'

const getRoot = (state: RootState) => state.pointsManage

export const getListMyPointData = createSelector(getRoot, (state) => state.list_my_points)
export const getListHistoryPoint = createSelector(getRoot, (state) => state.list_history_points)
export const getListUsedPoint = createSelector(getRoot, (state) => state.list_used_points)
