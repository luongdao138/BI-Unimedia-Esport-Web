import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '@store/store'

const getRoot = (state: RootState) => state.common

export const getPrefectures = createSelector(getRoot, (state) => state.prefectures)
