import { createSelector } from '@reduxjs/toolkit'
import { ArenaWinners, MatchItemType } from '@services/arena.service'
import { RootState } from '@store/store'
import moment from 'moment'
import _ from 'lodash'

const getRoot = (state: RootState) => state.arena
const getUserId = (state: RootState) => state.auth?.user?.id

export const getSearchTournaments = createSelector(getRoot, (state) => state.searchTournaments)
export const getSearchTournamentsMeta = createSelector(getRoot, (state) => state.searchTournamentsMeta)
export const getTournamentFollowers = createSelector(getRoot, (state) => state.tournamentFollowers)
export const getTournamentFollowersMeta = createSelector(getRoot, (state) => state.tournamentFollowersMeta)
export const getTournamentResults = createSelector(getRoot, (state) => state.tournamentResults)
export const getTournamentDetail = createSelector(getRoot, (state) => state.tournamentDetail)
export const getParticipants = createSelector(getRoot, (state) => state.tournamentParticipants)
export const getBattleRoyaleParticipants = createSelector(getRoot, getTournamentDetail, (state, arena) => {
  if (!arena?.attributes.my_info) return state.tournamentParticipants
  const isTeam = arena?.attributes.participant_type > 1
  const ids = isTeam
    ? (arena?.attributes.my_info || []).map((a) => String(a.team_id))
    : (arena?.attributes.my_info || []).map((a) => String(a.id))
  return state.tournamentParticipants.map((participant) => ({
    ...participant,
    highlight: isTeam ? ids.includes(participant.attributes.team.data.id) : ids.includes(String(participant.id)),
  }))
})
export const getSortedBRParticipants = createSelector(getBattleRoyaleParticipants, getTournamentDetail, (participants, arena) => {
  if (!arena) return []
  const { sort_by } = arena.attributes
  return sort_by === 'by_desc'
    ? _.orderBy(participants, ['attributes.position'], ['desc'])
    : _.orderBy(participants, ['attributes.position'], ['asc'])
})

export const getParticipantsMeta = createSelector(getRoot, (state) => state.participantsMeta)
export const getSuggestedTeamMembers = createSelector(getRoot, (state) => state.suggestedTeamMembers)
export const getSuggestedTeamMembersMeta = createSelector(getRoot, (state) => state.suggestedTeamMembersMeta)
export const getInteresteds = createSelector(getRoot, (state) => state.tournamentInteresteds)
export const getInterestedsMeta = createSelector(getRoot, (state) => state.interestedsMeta)
export const getTournamentMatches = createSelector(getRoot, getUserId, (state, myId) => {
  const isTeam = state.tournamentDetail?.attributes.participant_type > 1
  const ids = isTeam ? (state.tournamentDetail?.attributes.my_info || []).map((a) => a.team_id) : [myId]
  const matches = state.tournamentMatches.matches.map((round) =>
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
  const third_place_match = state.tournamentMatches.third_place_match.map((match) => {
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
export const getRecruitingTournaments = createSelector(getRoot, (state) => state.recruitingTournaments)
export const getArenaWinners = createSelector(getRoot, getTournamentDetail, (state, arena) => {
  const { arenaWinners } = state
  if (!arena?.attributes?.my_info) return arenaWinners
  const isTeam = arena.attributes.participant_type > 1
  const ids = arena.attributes.my_info.map((i) => (isTeam ? i.team_id : i.id))

  const winners: ArenaWinners = {}
  Object.keys(arenaWinners).forEach((key) => {
    winners[key] = state.arenaWinners[key].map((item) => {
      return { ...item, highlight: ids.includes(isTeam ? item.team_id : item.id) }
    })
  })
  return winners
})
export const getRecommendedUsers = createSelector(getRoot, (state) => state.recommendedUsers)
export const getRecommendedUsersMeta = createSelector(getRoot, (state) => state.recommendedUsersMeta)
export const getTournamentResultsMeta = createSelector(getRoot, (state) => state.tournamentResultsMeta)
export const getRecruitingTournamentsMeta = createSelector(getRoot, (state) => state.recruitingTournamentsMeta)
export const getParticipant = createSelector(getRoot, (state) => state.selectedParticipant)
export const getTeamDetail = createSelector(getRoot, (state) => state.selectedTeamDetail)
export const getSearchFilteredTournaments = createSelector(getRoot, (state) => {
  return state.searchTournaments.map((item) => {
    return {
      ...item,
      participantsLimited: item.attributes.participants ? item.attributes.participants.slice(0, 3) : [],
      total: _.defaultTo(
        item.attributes.is_freezed
          ? item.attributes.participant_count
          : Number(item.attributes.participant_count) + Number(item.attributes.interested_count),
        0
      ),
      startDate: moment(item.attributes.start_date).format('YYYY/MM/DD'),
    }
  })
})
