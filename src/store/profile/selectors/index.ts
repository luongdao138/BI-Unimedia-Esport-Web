import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '@store/store'

const getRoot = (state: RootState) => state.profile

export const getProfile = createSelector(getRoot, (state) => state.profile)
