import _ from 'lodash'
import { createReducer } from '@reduxjs/toolkit'
import * as actions from '../actions'
import {
  TournamentResponse,
  PageMeta,
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
  ParticipantName,
  TournamentTeamDetail,
} from '@services/arena.service'
import { TOURNAMENT_STATUS } from '@constants/tournament.constants'
import { genRanHex } from '@utils/helpers/CommonHelper'

type StateType = {
  searchTournaments?: Array<TournamentResponse>
  searchTournamentsMeta?: PageMeta
  tournamentFollowers: Array<FollowersResponse>
  tournamentResults: Array<ResultsResponse>
  tournamentDetail?: TournamentDetail
  tournamentParticipants?: Array<ParticipantsResponse>
  participantsMeta?: PageMeta
  suggestedTeamMembers?: SuggestedTeamMembersResponse[]
  suggestedTeamMembersMeta?: PageMeta
  tournamentInteresteds?: Array<ParticipantsResponse>
  interestedsMeta?: PageMeta
  tournamentMatches: TournamentMatchResponse
  recruitingTournaments: Array<RecruitingResponse>
  arenaWinners: ArenaWinners
  recommendedUsers?: Array<RecommendedUsers>
  recommendedUsersMeta?: PageMeta
  tournamentFollowersMeta?: PageMeta
  tournamentResultsMeta?: PageMeta
  recruitingTournamentsMeta?: PageMeta
  selectedParticipant?: ParticipantName
  selectedTeamDetail?: TournamentTeamDetail
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
}

export default createReducer(initialState, (builder) => {
  builder.addCase(actions.tournamentSearch.fulfilled, (state, action) => {
    let searchTournaments = action.payload.data
    if (action.payload.meta != undefined && action.payload.meta.current_page > 1) {
      searchTournaments = _.unionBy(state.searchTournaments, action.payload.data, 'attributes.hash_key')
    }
    state.searchTournaments = searchTournaments
    state.searchTournamentsMeta = action.payload.meta
  })
  builder.addCase(actions.resetSearchTournaments, (state) => {
    state.searchTournaments = []
    state.searchTournamentsMeta = undefined
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
  builder.addCase(actions.leaveTournament.fulfilled, (state) => {
    state.tournamentDetail.attributes.interested_count--
    state.tournamentDetail.attributes.is_entered = false
    state.tournamentDetail.attributes.my_info = state.tournamentDetail.attributes.my_info.filter((info) => {
      info.role !== 'interested'
    })
  })
  builder.addCase(actions.closeTournament.fulfilled, (state) => {
    state.tournamentDetail.attributes.status = TOURNAMENT_STATUS.RECRUITMENT_CLOSED as TournamentStatus
  })
  builder.addCase(actions.cancelTournament.fulfilled, (state) => {
    state.tournamentDetail.attributes.status = TOURNAMENT_STATUS.CANCELLED as TournamentStatus
  })
  builder.addCase(actions.getTournamentParticipants.fulfilled, (state, action) => {
    let _participants = action.payload.data
    if (action.payload.meta != undefined && action.payload.meta.current_page > 1) {
      _participants = state.tournamentParticipants.concat(action.payload.data)
    }
    if (!action.meta.arg.role) {
      state.tournamentDetail.attributes.interested_count = action.payload.meta.total_count
    }
    state.tournamentParticipants = _participants
    state.participantsMeta = action.payload.meta
  })
  builder.addCase(actions.getBattleRoyaleParticipants.fulfilled, (state, action) => {
    let _participants = action.payload.data
    if (action.payload.meta != undefined && action.payload.meta.current_page > 1) {
      _participants = state.tournamentParticipants.concat(action.payload.data)
    }
    if (!action.meta.arg.role) {
      state.tournamentDetail.attributes.interested_count = action.payload.meta.total_count
    }
    state.tournamentParticipants = _participants
    state.participantsMeta = {
      total_count: _participants.length,
      per_page: 0,
      current_page: 1,
      total_pages: 1,
    }
  })
  builder.addCase(actions.resetParticipants, (state) => {
    state.tournamentParticipants = []
    state.participantsMeta = undefined
  })
  builder.addCase(actions.getSuggestedTeamMembers.fulfilled, (state, action) => {
    let _suggestedTeamMembers = action.payload.data
    if (action.payload.links != undefined && action.payload.links.meta.current_page > 1) {
      _suggestedTeamMembers = _.unionBy(state.suggestedTeamMembers, action.payload.data, 'id')
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
    state.tournamentMatches.matches = action.payload.matches
    state.tournamentMatches.third_place_match = action.payload.third_place_match.map((match) => ({
      ...match,
      match_no: match.match_no + 1,
    }))
  })
  builder.addCase(actions.getTournamentMatchesInterval.fulfilled, (state, action) => {
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
    const places = Object.keys(action.payload.matches)
    const matches = Object.assign({}, action.payload.matches)
    for (const p of places) {
      matches[p] = matches[p].map((i) => ({
        ...i,
        name: i.team ? i.team.name : i.name,
      }))
    }
    state.arenaWinners = matches
  })
  builder.addCase(actions.getRecommendedUsersByName.fulfilled, (state, action) => {
    let _recommendedUsers = action.payload.data
    if (action.payload.links != undefined && action.payload.links.meta.current_page > 1) {
      _recommendedUsers = _.unionBy(state.recommendedUsers, action.payload.data, 'id')
    }

    state.recommendedUsers = _recommendedUsers
    state.recommendedUsersMeta = action.payload.links?.meta
  })
  builder.addCase(actions.clearRecommendedUsers, (state) => {
    state.recommendedUsers = []
    state.recommendedUsersMeta = undefined
  })
  builder.addCase(actions.clearTournamentResult, (state) => {
    state.searchTournaments = []
  })
  builder.addCase(actions.freezeTournament.fulfilled, (state, action) => {
    state.tournamentDetail = action.payload.data
  })
  builder.addCase(actions.getParticipantName.fulfilled, (state, action) => {
    state.selectedParticipant = action.payload.data
  })
  builder.addCase(actions.changeParticipantName.fulfilled, (state, action) => {
    state.selectedParticipant.attributes.name = action.payload.name
  })
  builder.addCase(actions.getTournamentTeamDetail.fulfilled, (state, action) => {
    state.selectedTeamDetail = action.payload.data
  })
  builder.addCase(actions.teamMemberFollowStageChanged, (state, action) => {
    const tournamentParticipants = _.cloneDeep(state.tournamentParticipants)
    state.tournamentParticipants = tournamentParticipants.map((participant) => {
      return {
        ...participant,
        version: genRanHex(2),
        attributes: {
          ...participant.attributes,
          team: {
            data: {
              ...participant.attributes.team.data,
              attributes: {
                ...participant.attributes.team.data.attributes,
                members: participant.attributes.team.data.attributes.members.map((member) => {
                  if (member.user_id !== action.payload.userId) return { ...member }
                  return Object.assign(
                    {},
                    {
                      ...member,
                      is_followed: action.payload.state,
                    }
                  )
                }),
              },
            },
          },
        },
      }
    })
  })
  builder.addCase(actions.setBattleRoyaleScores.fulfilled, (state, action) => {
    state.tournamentParticipants = action.payload.data
  })
  builder.addCase(actions.getBattleRoyaleWinners.fulfilled, (state, action) => {
    state.tournamentParticipants = action.payload.data
  })
  builder.addCase(actions.summaryTournament.fulfilled, (state, action) => {
    if (state.tournamentDetail?.attributes) {
      state.tournamentDetail.attributes.summary = action.meta.arg.data.value
      state.tournamentDetail.attributes.summary_image = action.meta.arg.data.summary_image_url
    }
  })
  builder.addCase(actions.clearArenaDetail, (state) => {
    state.tournamentDetail = undefined
  })
  builder.addCase(actions.clearArenaWinners, (state) => {
    state.arenaWinners = {}
    state.tournamentParticipants = []
  })
})
