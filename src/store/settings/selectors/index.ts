import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '@store/store'

const getRoot = (state: RootState) => state.settings

export const getFeatures = createSelector(getRoot, (state) => state.userFeatures)
