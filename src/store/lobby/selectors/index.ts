import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '@store/store'

const getRoot = (state: RootState) => state.lobby

export const lobbyDetail = createSelector(getRoot, (state) => state.detail)
export const getSearchLobbies = createSelector(getRoot, (state) => state.searchLobbies)
export const getSearchLobbiesMeta = createSelector(getRoot, (state) => state.searchLobbiesMeta)
export const participantSelector = createSelector(getRoot, (state) => state.participants)
