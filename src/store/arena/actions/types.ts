export enum SEARCH_ACTION_TYPE {
  TOURNAMENT_SEARCH = 'tournament/tournamentSearch',
  RESET_SEARCH_TOURNAMENTS = 'tournament/resetSearchTournaments',
}
export enum TOURNAMENT_ACTION_TYPE {
  TOURNAMENT_FOLLOWERS = 'tournament/tournamentFollowers',
  TOURNAMENT_RESULTS = 'tournament/tournamentResults',
  RECRUITING_TOURNAMENT = 'tournament/recruiting',
}

export const GET_TOURNAMENT_DETAIL = 'tournament/getTournamentDetail'
export const GET_ENTRY_STATUS = 'tournament/getEntryStatus'
export const JOIN_TOURNAMENT = 'tournament/joinTournament'
export const LEAVE_TOURNAMENT = 'tournament/leaveTournament'
export const CLOSE_TOURNAMENT = 'tournament/closeTournament'
export const CLEAR_TOURNAMENT_RESULT = 'tournament/CLEAR_TOURNAMENT_RESULT'
export const GET_TOURNAMENT_PARTICIPANTS = 'tournament/getTournamentParticipants'
export const GET_SUGGESTED_TEAM_MEMBERS = 'tournament/getSuggestedTeamMembers'
export const GET_TOURNAMENT_INTERESTEDS = 'tournament/getTournamentInteresteds'
export const GET_TOURNAMENT_MATCHES = 'tournament/getTournamentMatches'
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
