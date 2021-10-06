import moment from 'moment'
import _ from 'lodash'
import { createSelector } from '@reduxjs/toolkit'
import { ArenaWinners, MatchItemType } from '@services/arena.service'
import { RootState } from '@store/store'
import { TournamentHelper } from '@utils/helpers/TournamentHelper'

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
    highlight: isTeam ? ids.includes(participant.attributes.team?.data?.id) : ids.includes(String(participant?.id)),
  }))
})
export const getSortedBRParticipants = createSelector(getBattleRoyaleParticipants, (participants) => {
  return participants
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
      acceptance_start_date: moment(item.attributes.acceptance_start_date).format('YYYY/MM/DD HH:mm ~'),
    }
  })
})

export const getBattleRoyaleFirstPlace = createSelector(getTournamentDetail, getSortedBRParticipants, (arena, participants) => {
  if (arena && participants.length) {
    if (TournamentHelper.isBRResultComplete(participants)) {
      const isTeam = arena.attributes.participant_type > 1
      return {
        avatar: participants[0].attributes.avatar_url,
        name: isTeam ? participants[0].attributes.team?.data?.attributes?.name : participants[0].attributes?.name,
        user_code: isTeam ? '' : participants[0].attributes?.user?.user_code,
      }
    }
  }
  return null
})

export const getTournamentFirstPlace = createSelector(getTournamentDetail, getArenaWinners, (arena, arenaWinners) => {
  if (arena && arenaWinners['1'] && arenaWinners['1'].length) {
    const isTeam = arena.attributes.participant_type > 1
    return {
      avatar: arenaWinners['1'][0].avatar,
      name: arenaWinners['1'][0].name,
      user_code: isTeam ? '' : arenaWinners['1'][0].user?.user_code,
    }
  }
  return null
})
