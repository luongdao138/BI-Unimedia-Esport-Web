import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '@store/store'

const getRoot = (state: RootState) => state.purchasePoint
// const getRootCommunity = (state: RootState) => state.community

export const getPurchasePoint = createSelector(getRoot, (state) => state)
