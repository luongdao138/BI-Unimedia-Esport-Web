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
export const getSuggestedTeamMembers = createSelector(getRoot, (state) => state.suggestedTeamMembers)
export const getSuggestedTeamMembersMeta = createSelector(getRoot, (state) => state.suggestedTeamMembersMeta)
export const getInteresteds = createSelector(getRoot, (state) => state.tournamentInteresteds)
export const getInterestedsMeta = createSelector(getRoot, (state) => state.interestedsMeta)
export const getTournamentMatches = createSelector(getRoot, (state) => state.tournamentMatches)
export const getRecruitingTournaments = createSelector(getRoot, (state) => state.recruitingTournaments)
export const getRecommendedUsers = createSelector(getRoot, (state) => state.recommendedUsers)
export const getRecommendedUsersMeta = createSelector(getRoot, (state) => state.recommendedUsersMeta)
