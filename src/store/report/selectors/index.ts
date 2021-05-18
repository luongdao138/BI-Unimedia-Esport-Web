import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '@store/store'

const getRoot = (state: RootState) => state.report

export const getReasons = createSelector(getRoot, (state) => state.reasons)
export const getReasonsMeta = createSelector(getRoot, (state) => state.reasonsMeta)
