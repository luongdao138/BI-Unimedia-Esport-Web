export enum SEARCH_ACTION_TYPE {
  TOURNAMENT_SEARCH = 'tournament/tournamentSearch',
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
export const GET_TOURNAMENT_PARTICIPANTS = 'tournament/getTournamentParticipants'
export const GET_SUGGESTED_TEAM_MEMBERS = 'tournament/getSuggestedTeamMembers'
export const GET_TOURNAMENT_INTERESTEDS = 'tournament/getTournamentInteresteds'
export const GET_TOURNAMENT_MATCHES = 'tournament/getTournamentMatches'
export const SET_TOURNAMENT_PARTICIPANT = 'tournament/setTournamentParticipant'
export const SET_TOURNAMENT_SCORE = 'tournament/setTournamentScore'
