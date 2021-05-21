import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '@store/store'

const getRoot = (state: RootState) => state.tournament

export const getSearchTournaments = createSelector(getRoot, (state) => state.searchTournaments)
export const getSearchTournamentsMeta = createSelector(getRoot, (state) => state.searchTournamentsMeta)
export const getTournamentFollowers = createSelector(getRoot, (state) => state.tournamentFollowers)
export const getTournamentFollowersMeta = createSelector(getRoot, (state) => state.tournamentFollowersMeta)
export const getTournamentResults = createSelector(getRoot, (state) => state.tournamentResults)
export const getTournamentResultsMeta = createSelector(getRoot, (state) => state.tournamentResultsMeta)
export const getRecruitingTournaments = createSelector(getRoot, (state) => state.recruitingTournaments)
export const getRecruitingTournamentsMeta = createSelector(getRoot, (state) => state.recruitingTournamentsMeta)
