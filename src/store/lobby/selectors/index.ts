import { createSelector } from '@reduxjs/toolkit'
import { MatchItemType } from '@services/lobby.service'
import { RootState } from '@store/store'

const getRoot = (state: RootState) => state.lobby
const getUserId = (state: RootState) => state.auth?.user?.id

export const getSearchLobbys = createSelector(getRoot, (state) => state.searchLobbys)
export const getSearchLobbysMeta = createSelector(getRoot, (state) => state.searchLobbysMeta)
export const getLobbyFollowers = createSelector(getRoot, (state) => state.lobbyFollowers)
export const getLobbyFollowersMeta = createSelector(getRoot, (state) => state.lobbyFollowersMeta)
export const getLobbyResults = createSelector(getRoot, (state) => state.lobbyResults)
export const getLobbyDetail = createSelector(getRoot, (state) => state.lobbyDetail)
export const getParticipants = createSelector(getRoot, (state) => state.lobbyParticipants)
export const getParticipantsMeta = createSelector(getRoot, (state) => state.participantsMeta)
export const getSuggestedTeamMembers = createSelector(getRoot, (state) => state.suggestedTeamMembers)
export const getSuggestedTeamMembersMeta = createSelector(getRoot, (state) => state.suggestedTeamMembersMeta)
export const getInteresteds = createSelector(getRoot, (state) => state.lobbyInteresteds)
export const getInterestedsMeta = createSelector(getRoot, (state) => state.interestedsMeta)
export const getLobbyMatches = createSelector(getRoot, getUserId, (state, myId) => {
  const isTeam = state.lobbyDetail?.attributes.participant_type > 1
  const ids = isTeam ? (state.lobbyDetail?.attributes.my_info || []).map((a) => a.team_id) : [myId]
  const matches = state.lobbyMatches.matches.map((round) =>
    round.map((match) => {
      if (match.home_user && ids.includes(match.home_user.id)) {
        const highlight: MatchItemType = 'home'
        return { ...match, highlight }
      } else if (match.guest_user && ids.includes(match.guest_user.id)) {
        const highlight: MatchItemType = 'guest'
        return { ...match, highlight }
      }
      return match
    })
  )
  const third_place_match = state.lobbyMatches.third_place_match.map((match) => {
    if (match.home_user && ids.includes(match.home_user.id)) {
      const highlight: MatchItemType = 'home'
      return { ...match, highlight }
    } else if (match.guest_user && ids.includes(match.guest_user.id)) {
      const highlight: MatchItemType = 'guest'
      return { ...match, highlight }
    }
    return match
  })
  return { matches, third_place_match }
})
export const getRecruitingLobbys = createSelector(getRoot, (state) => state.recruitingLobbys)
export const getArenaWinners = createSelector(getRoot, (state) => state.arenaWinners)
export const getRecommendedUsers = createSelector(getRoot, (state) => state.recommendedUsers)
export const getRecommendedUsersMeta = createSelector(getRoot, (state) => state.recommendedUsersMeta)
export const getLobbyResultsMeta = createSelector(getRoot, (state) => state.lobbyResultsMeta)
export const getRecruitingLobbysMeta = createSelector(getRoot, (state) => state.recruitingLobbysMeta)
export const getParticipant = createSelector(getRoot, (state) => state.selectedParticipant)
export const getTeamDetail = createSelector(getRoot, (state) => state.selectedTeamDetail)
