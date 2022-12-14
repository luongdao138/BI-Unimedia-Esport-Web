export enum SEARCH_ACTION_TYPE {
  TOURNAMENT_SEARCH = 'tournament/tournamentSearch',
  RESET_SEARCH_TOURNAMENTS = 'tournament/resetSearchTournaments',
}
export enum TOURNAMENT_ACTION_TYPE {
  TOURNAMENT_FOLLOWERS = 'tournament/tournamentFollowers',
  TOURNAMENT_RESULTS = 'tournament/tournamentResults',
  RECRUITING_TOURNAMENT = 'tournament/recruiting',
  TEAM_MEMBER_FOLLOW_STATE_CHANGED = 'tournament/TEAM_MEMBER_FOLLOW_STATE_CHANGED',
}

export interface TeamMemberSelectItem {
  id: string
  nickname: string
  avatar: string
  userCode: string
  name?: string
}
export interface MemberSelection {
  item: TeamMemberSelectItem | null
  index: number
}

export const GET_TOURNAMENT_DETAIL = 'tournament/getTournamentDetail'
export const GET_ENTRY_STATUS = 'tournament/getEntryStatus'
export const JOIN_TOURNAMENT = 'tournament/joinTournament'
export const LEAVE_TOURNAMENT = 'tournament/leaveTournament'
export const CLOSE_TOURNAMENT = 'tournament/closeTournament'
export const CANCEL_TOURNAMENT = 'tournament/cancelTournament'
export const CLEAR_TOURNAMENT_RESULT = 'tournament/CLEAR_TOURNAMENT_RESULT'
export const GET_TOURNAMENT_PARTICIPANTS = 'tournament/getTournamentParticipants'
export const GET_BATTLE_ROYALE_PARTICIPANTS = 'tournament/getBattleRoyaleParticipants'
export const RESET_TOURNAMENT_PARTICIPANTS = 'tournament/resetTournamentParticipants'
export const GET_SUGGESTED_TEAM_MEMBERS = 'tournament/getSuggestedTeamMembers'
export const GET_TOURNAMENT_INTERESTEDS = 'tournament/getTournamentInteresteds'
export const GET_TOURNAMENT_MATCHES = 'tournament/getTournamentMatches'
export const GET_TOURNAMENT_MATCHES_INTERVAL = 'tournament/getTournamentMatchesInterval'
export const SET_TOURNAMENT_PARTICIPANT = 'tournament/setTournamentParticipant'
export const SET_ARENA_PARTICIPANTS = 'tournament/setArenaParticipants'
export const GET_ARENA_WINNERS = 'tournament/getArenaWinners'
export const GET_RECOMMENDED_USERS = 'tournament/recommendedUsers'
export const CLEAR_RECOMMENDED_USERS = 'tournament/clearRecommendedUsers'
export const CREATE_TOURNAMENT = 'tournament/createTournament'
export const UPDATE_TOURNAMENT = 'tournament/updateTournament'
export const SET_TOURNAMENT_SCORE = 'tournament/setTournamentScore'
export const RANDOMIZE_TOURNAMENT = 'tournament/randomizeTournament'
export const FREEZE_TOURNAMENT = 'tournament/freezeTournament'
export const SUMMARY_TOURNAMENT = 'tournament/summaryTournament'
export const GET_PARTICIPANT_NAME = 'tournament/getParticipantName'
export const CHANGE_PARTICIPANT_NAME = 'tournament/changeParticipantName'
export const GET_TOURNAMENT_TEAM_DETAIL = 'tournament/getTournamentTeamDetail'
export const UPDATE_TOURNAMENT_TEAM_DETAIL = 'tournament/updateTournamentTeamDetail'
export const SET_BATTLE_ROYALE_SCORES = 'arena/setBattleRoyaleScores'
export const GET_BATTLE_ROYALE_WINNERS = 'arena/getBattleRoyaleWinners'
export const CLEAR_ARENA_DETAIL = 'arena/CLEAR_ARENA_DETAIL'
export const CLEAR_ARENA_WINNERS = 'arena/CLEAR_ARENA_WINNERS'
