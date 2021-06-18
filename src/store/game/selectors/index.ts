import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '@store/store'

const getRoot = (state: RootState) => state.gameTitle

export const getGameGenres = createSelector(getRoot, (state) => state.genres)
export const getGames = createSelector(getRoot, (state) => state.games)
export const getCreatedGame = createSelector(getRoot, (state) => state.createdGame)
