import { createReducer } from '@reduxjs/toolkit'
import * as actions from '../actions'
import {
  TournamentResponse,
  Meta,
  FollowersResponse,
  ResultsResponse,
  TournamentDetail,
  ParticipantsResponse,
  SuggestedTeamMembersResponse,
  TournamentMatchResponse,
  RecruitingResponse,
  ArenaWinners,
  TournamentStatus,
  RecommendedUsers,
} from '@services/tournament.service'
import { TOURNAMENT_STATUS } from '@constants/tournament.constants'

type StateType = {
  searchTournaments?: Array<TournamentResponse>
  searchTournamentsMeta?: Meta
  tournamentFollowers: Array<FollowersResponse>
  tournamentResults: Array<ResultsResponse>
  tournamentDetail?: TournamentDetail
  tournamentParticipants?: Array<ParticipantsResponse>
  participantsMeta?: Meta
  suggestedTeamMembers?: Array<SuggestedTeamMembersResponse>
  suggestedTeamMembersMeta?: Meta
  tournamentInteresteds?: Array<ParticipantsResponse>
  interestedsMeta?: Meta
  tournamentMatches: TournamentMatchResponse
  recruitingTournaments: Array<RecruitingResponse>
  arenaWinners: ArenaWinners
  recommendedUsers?: Array<RecommendedUsers>
  recommendedUsersMeta?: Meta
  tournamentFollowersMeta: Meta
  tournamentResultsMeta: Meta
  recruitingTournamentsMeta: Meta
}

const initialState: StateType = {
  searchTournaments: [],
  tournamentFollowers: [],
  tournamentResults: [],
  tournamentParticipants: [],
  suggestedTeamMembers: [],
  tournamentInteresteds: [],
  tournamentMatches: { matches: [], third_place_match: [] },
  arenaWinners: {},
  recruitingTournaments: [],
  recommendedUsers: [],
  tournamentFollowersMeta: undefined,
  tournamentResultsMeta: undefined,
  recruitingTournamentsMeta: undefined,
}

export default createReducer(initialState, (builder) => {
  builder.addCase(actions.tournamentSearch.fulfilled, (state, action) => {
    let searchTournaments = action.payload.data
    if (action.payload.links != undefined && action.payload.links.meta.current_page > 1) {
      searchTournaments = state.searchTournaments.concat(action.payload.data)
    }

    state.searchTournaments = searchTournaments
    state.searchTournamentsMeta = action.payload.links?.meta
  })
  builder.addCase(actions.getTournamentFollowers.fulfilled, (state, action) => {
    let tmpTournamentFollowers = action.payload.data
    if (action.payload.meta != undefined && action.payload.meta.current_page > 1) {
      tmpTournamentFollowers = state.tournamentFollowers.concat(action.payload.data)
    }
    state.tournamentFollowers = tmpTournamentFollowers
    state.tournamentFollowersMeta = action.payload.meta
  })
  builder.addCase(actions.getTournamentResults.fulfilled, (state, action) => {
    let tmpTournamentResults = action.payload.data
    if (action.payload.meta != undefined && action.payload.meta.current_page > 1) {
      tmpTournamentResults = state.tournamentResults.concat(action.payload.data)
    }
    state.tournamentResults = tmpTournamentResults
    state.tournamentResultsMeta = action.payload.meta
  })
  builder.addCase(actions.getTournamentDetail.fulfilled, (state, action) => {
    state.tournamentDetail = action.payload.data
  })
  builder.addCase(actions.getEntryStatus.fulfilled, (state, action) => {
    state.tournamentDetail.attributes.is_entered = action.payload.is_entry
  })
  builder.addCase(actions.joinTournament.fulfilled, (state) => {
    state.tournamentDetail.attributes.interested_count++
    state.tournamentDetail.attributes.is_entered = true
  })
  builder.addCase(actions.leaveTournament.fulfilled, (state) => {
    state.tournamentDetail.attributes.interested_count--
    state.tournamentDetail.attributes.is_entered = false
  })
  builder.addCase(actions.closeTournament.fulfilled, (state) => {
    state.tournamentDetail.attributes.status = TOURNAMENT_STATUS.RECRUITMENT_CLOSED as TournamentStatus
  })
  builder.addCase(actions.getTournamentParticipants.fulfilled, (state, action) => {
    let _participants = action.payload.data
    if (action.payload.meta != undefined && action.payload.meta.current_page > 1) {
      _participants = state.tournamentParticipants.concat(action.payload.data)
    }
    state.tournamentParticipants = _participants
    state.participantsMeta = action.payload.meta
  })
  builder.addCase(actions.getSuggestedTeamMembers.fulfilled, (state, action) => {
    let _suggestedTeamMembers = action.payload.data
    if (action.payload.links != undefined && action.payload.links.meta.current_page > 1) {
      _suggestedTeamMembers = state.suggestedTeamMembers.concat(action.payload.data)
    }

    state.suggestedTeamMembers = _suggestedTeamMembers
    state.suggestedTeamMembersMeta = action.payload.links?.meta
  })
  builder.addCase(actions.getTournamentInteresteds.fulfilled, (state, action) => {
    let _interesteds = action.payload.data
    if (action.payload.meta != undefined && action.payload.meta.current_page > 1) {
      _interesteds = state.tournamentInteresteds.concat(action.payload.data)
    }
    state.tournamentInteresteds = _interesteds
    state.interestedsMeta = action.payload.meta
  })
  builder.addCase(actions.getTournamentMatches.fulfilled, (state, action) => {
    state.tournamentMatches = action.payload
  })
  builder.addCase(actions.getRecruitingTournaments.fulfilled, (state, action) => {
    let tmpRecruitingTournaments = action.payload.data
    if (action.payload.meta != undefined && action.payload.meta.current_page > 1) {
      tmpRecruitingTournaments = state.recruitingTournaments.concat(action.payload.data)
    }
    state.recruitingTournaments = tmpRecruitingTournaments
    state.recruitingTournamentsMeta = action.payload.meta
  })
  builder.addCase(actions.getArenaWinners.fulfilled, (state, action) => {
    state.arenaWinners = action.payload.matches
  })
  builder.addCase(actions.getRecommendedUsersByName.fulfilled, (state, action) => {
    let _recommendedUsers = action.payload.data
    if (action.payload.links != undefined && action.payload.links.meta.current_page > 1) {
      _recommendedUsers = state.recommendedUsers.concat(action.payload.data)
    }

    state.recommendedUsers = _recommendedUsers
    state.recommendedUsersMeta = action.payload.links?.meta
  })
  builder.addCase(actions.clearRecommendedUsers, (state) => {
    state.recommendedUsers = []
  })
  builder.addCase(actions.freezeTournament.fulfilled, (state, action) => {
    state.tournamentDetail = action.payload.data
  })
})
