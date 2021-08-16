import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '@store/store'

const getRoot = (state: RootState) => state.lobby

export const lobbyDetail = createSelector(getRoot, (state) => state.detail)
