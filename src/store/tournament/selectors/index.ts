import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '@store/store'

const getRoot = (state: RootState) => state.tournament

export const getSearchTournaments = createSelector(getRoot, (state) => state.searchTournaments)
export const getSearchTournamentsMeta = createSelector(getRoot, (state) => state.searchTournamentsMeta)
export const getTournamentFollowers = createSelector(getRoot, (state) => state.tournamentFollowers)
export const getTournamentResults = createSelector(getRoot, (state) => state.tournamentResults)
export const getTournamentDetail = createSelector(getRoot, (state) => state.tournamentDetail)
export const getParticipants = createSelector(getRoot, (state) => state.tournamentParticipants)
export const getParticipantsMeta = createSelector(getRoot, (state) => state.participantsMeta)
export const getInteresteds = createSelector(getRoot, (state) => state.tournamentInteresteds)
export const getInterestedsMeta = createSelector(getRoot, (state) => state.interestedsMeta)
