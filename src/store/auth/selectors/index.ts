import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '@store/store'

const getRoot = (state: RootState) => state.auth

export const getAuth = createSelector(getRoot, (state) => state.user)
