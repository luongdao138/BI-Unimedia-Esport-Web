import { createSelector } from '@reduxjs/toolkit'
import { MatchItemType } from '@services/arena.service'
import { RootState } from '@store/store'

const getRoot = (state: RootState) => state.arena
const getUserId = (state: RootState) => state.auth?.user?.id

export const getSearchTournaments = createSelector(getRoot, (state) => state.searchTournaments)
export const getSearchTournamentsMeta = createSelector(getRoot, (state) => state.searchTournamentsMeta)
export const getTournamentFollowers = createSelector(getRoot, (state) => state.tournamentFollowers)
export const getTournamentFollowersMeta = createSelector(getRoot, (state) => state.tournamentFollowersMeta)
export const getTournamentResults = createSelector(getRoot, (state) => state.tournamentResults)
export const getTournamentDetail = createSelector(getRoot, (state) => state.tournamentDetail)
export const getParticipants = createSelector(getRoot, (state) => state.tournamentParticipants)
export const getParticipantsMeta = createSelector(getRoot, (state) => state.participantsMeta)
export const getSuggestedTeamMembers = createSelector(getRoot, (state) => state.suggestedTeamMembers)
export const getSuggestedTeamMembersMeta = createSelector(getRoot, (state) => state.suggestedTeamMembersMeta)
export const getInteresteds = createSelector(getRoot, (state) => state.tournamentInteresteds)
export const getInterestedsMeta = createSelector(getRoot, (state) => state.interestedsMeta)
export const getTournamentMatches = createSelector(getRoot, getUserId, (state, id) => {
  const matches = state.tournamentMatches.matches.map((round) =>
    round.map((match) => {
      if (match.home_user && match.home_user.id === id) {
        const highlight: MatchItemType = 'home'
        return { ...match, highlight }
      } else if (match.guest_user && match.guest_user.id === id) {
        const highlight: MatchItemType = 'guest'
        return { ...match, highlight }
      }
      return match
    })
  )
  const third_place_match = state.tournamentMatches.third_place_match.map((match) => {
    if (match.home_user && match.home_user.id === id) {
      const highlight: MatchItemType = 'home'
      return { ...match, highlight }
    } else if (match.guest_user && match.guest_user.id === id) {
      const highlight: MatchItemType = 'guest'
      return { ...match, highlight }
    }
    return match
  })
  return { matches, third_place_match }
})
export const getRecruitingTournaments = createSelector(getRoot, (state) => state.recruitingTournaments)
export const getArenaWinners = createSelector(getRoot, (state) => state.arenaWinners)
export const getRecommendedUsers = createSelector(getRoot, (state) => state.recommendedUsers)
export const getRecommendedUsersMeta = createSelector(getRoot, (state) => state.recommendedUsersMeta)
export const getTournamentResultsMeta = createSelector(getRoot, (state) => state.tournamentResultsMeta)
export const getRecruitingTournamentsMeta = createSelector(getRoot, (state) => state.recruitingTournamentsMeta)
