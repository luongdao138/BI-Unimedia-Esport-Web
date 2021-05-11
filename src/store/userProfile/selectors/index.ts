import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '@store/store'

const getRoot = (state: RootState) => state.userProfile

export const getUserProfile = createSelector(getRoot, (state) => state.detail)
