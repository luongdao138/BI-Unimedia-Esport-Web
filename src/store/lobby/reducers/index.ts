import { createReducer } from '@reduxjs/toolkit'
import * as actions from '../actions'
import {
  LobbyResponse,
  PageMeta,
  FollowersResponse,
  ResultsResponse,
  LobbyDetail,
  ParticipantsResponse,
  SuggestedTeamMembersResponse,
  LobbyMatchResponse,
  RecruitingResponse,
  ArenaWinners,
  LobbyStatus,
  RecommendedUsers,
  ParticipantName,
  LobbyTeamDetail,
} from '@services/lobbydump.service'
import { TOURNAMENT_STATUS } from '@constants/lobby.constants'

type StateType = {
  searchLobbys?: Array<LobbyResponse>
  searchLobbysMeta?: PageMeta
  lobbyFollowers: Array<FollowersResponse>
  lobbyResults: Array<ResultsResponse>
  lobbyDetail?: LobbyDetail
  lobbyParticipants?: Array<ParticipantsResponse>
  participantsMeta?: PageMeta
  suggestedTeamMembers?: SuggestedTeamMembersResponse[]
  suggestedTeamMembersMeta?: PageMeta
  lobbyInteresteds?: Array<ParticipantsResponse>
  interestedsMeta?: PageMeta
  lobbyMatches: LobbyMatchResponse
  recruitingLobbys: Array<RecruitingResponse>
  arenaWinners: ArenaWinners
  recommendedUsers?: Array<RecommendedUsers>
  recommendedUsersMeta?: PageMeta
  lobbyFollowersMeta?: PageMeta
  lobbyResultsMeta?: PageMeta
  recruitingLobbysMeta?: PageMeta
  selectedParticipant?: ParticipantName
  selectedTeamDetail?: LobbyTeamDetail
}

const initialState: StateType = {
  searchLobbys: [],
  lobbyFollowers: [],
  lobbyResults: [],
  lobbyParticipants: [],
  suggestedTeamMembers: [],
  lobbyInteresteds: [],
  lobbyMatches: { matches: [], third_place_match: [] },
  arenaWinners: {},
  recruitingLobbys: [],
  recommendedUsers: [],
}

export default createReducer(initialState, (builder) => {
  builder.addCase(actions.lobbySearch.fulfilled, (state, action) => {
    let searchLobbys = action.payload.data
    if (action.payload.meta != undefined && action.payload.meta.current_page > 1) {
      searchLobbys = state.searchLobbys.concat(action.payload.data)
    }

    state.searchLobbys = searchLobbys
    state.searchLobbysMeta = action.payload.meta
  })
  builder.addCase(actions.resetSearchLobbys, (state) => {
    state.searchLobbys = []
    state.searchLobbysMeta = undefined
  })
  builder.addCase(actions.getLobbyFollowers.fulfilled, (state, action) => {
    let tmpLobbyFollowers = action.payload.data
    if (action.payload.meta != undefined && action.payload.meta.current_page > 1) {
      tmpLobbyFollowers = state.lobbyFollowers.concat(action.payload.data)
    }
    state.lobbyFollowers = tmpLobbyFollowers
    state.lobbyFollowersMeta = action.payload.meta
  })
  builder.addCase(actions.getLobbyResults.fulfilled, (state, action) => {
    let tmpLobbyResults = action.payload.data
    if (action.payload.meta != undefined && action.payload.meta.current_page > 1) {
      tmpLobbyResults = state.lobbyResults.concat(action.payload.data)
    }
    state.lobbyResults = tmpLobbyResults
    state.lobbyResultsMeta = action.payload.meta
  })

  builder.addCase(actions.getEntryStatus.fulfilled, (state, action) => {
    state.lobbyDetail.attributes.is_entered = action.payload.is_entry
  })
  builder.addCase(actions.leaveLobby.fulfilled, (state) => {
    state.lobbyDetail.attributes.interested_count--
    state.lobbyDetail.attributes.is_entered = false
    state.lobbyDetail.attributes.my_info = state.lobbyDetail.attributes.my_info.filter((info) => {
      info.role !== 'interested'
    })
  })
  builder.addCase(actions.closeLobby.fulfilled, (state) => {
    state.lobbyDetail.attributes.status = TOURNAMENT_STATUS.RECRUITMENT_CLOSED as LobbyStatus
  })
  builder.addCase(actions.cancelLobby.fulfilled, (state) => {
    state.lobbyDetail.attributes.status = TOURNAMENT_STATUS.CANCELLED as LobbyStatus
  })
  builder.addCase(actions.getLobbyParticipants.fulfilled, (state, action) => {
    let _participants = action.payload.data
    if (action.payload.meta != undefined && action.payload.meta.current_page > 1) {
      _participants = state.lobbyParticipants.concat(action.payload.data)
    }
    state.lobbyParticipants = _participants
    state.participantsMeta = action.payload.meta
  })
  builder.addCase(actions.resetParticipants, (state) => {
    state.lobbyParticipants = []
    state.participantsMeta = undefined
  })
  builder.addCase(actions.getSuggestedTeamMembers.fulfilled, (state, action) => {
    let _suggestedTeamMembers = action.payload.data
    if (action.payload.links != undefined && action.payload.links.meta.current_page > 1) {
      _suggestedTeamMembers = state.suggestedTeamMembers.concat(action.payload.data)
    }

    state.suggestedTeamMembers = _suggestedTeamMembers
    state.suggestedTeamMembersMeta = action.payload.links?.meta
  })
  builder.addCase(actions.getLobbyInteresteds.fulfilled, (state, action) => {
    let _interesteds = action.payload.data
    if (action.payload.meta != undefined && action.payload.meta.current_page > 1) {
      _interesteds = state.lobbyInteresteds.concat(action.payload.data)
    }
    state.lobbyInteresteds = _interesteds
    state.interestedsMeta = action.payload.meta
  })
  builder.addCase(actions.getLobbyMatches.fulfilled, (state, action) => {
    state.lobbyMatches = action.payload
  })
  builder.addCase(actions.getRecruitingLobbys.fulfilled, (state, action) => {
    let tmpRecruitingLobbys = action.payload.data
    if (action.payload.meta != undefined && action.payload.meta.current_page > 1) {
      tmpRecruitingLobbys = state.recruitingLobbys.concat(action.payload.data)
    }
    state.recruitingLobbys = tmpRecruitingLobbys
    state.recruitingLobbysMeta = action.payload.meta
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
      _recommendedUsers = state.recommendedUsers.concat(action.payload.data)
    }

    state.recommendedUsers = _recommendedUsers
    state.recommendedUsersMeta = action.payload.links?.meta
  })
  builder.addCase(actions.clearRecommendedUsers, (state) => {
    state.recommendedUsers = []
  })
  builder.addCase(actions.clearLobbyResult, (state) => {
    state.searchLobbys = []
  })

  builder.addCase(actions.getParticipantName.fulfilled, (state, action) => {
    state.selectedParticipant = action.payload.data
  })
  builder.addCase(actions.changeParticipantName.fulfilled, (state, action) => {
    state.selectedParticipant.attributes.name = action.payload.name
  })
  builder.addCase(actions.getLobbyTeamDetail.fulfilled, (state, action) => {
    state.selectedTeamDetail = action.payload.data
  })
})
