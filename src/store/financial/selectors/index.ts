import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '@store/store'

const getRoot = (state: RootState) => state.financial

export const financialStatementData = createSelector(getRoot, (state) => state.financialStatement)
export const financialStatementDetail = createSelector(getRoot, (state) => state.financialStatementDetail)
