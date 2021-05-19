export enum SEARCH_ACTION_TYPE {
  TOURNAMENT_SEARCH = 'tournament/tournamentSearch',
}
export enum TOURNAMENT_ACTION_TYPE {
  TOURNAMENT_FOLLOWERS = 'tournament/tournamentFollowers',
  TOURNAMENT_RESULTS = 'tournament/tournamentResults',
}

export const GET_TOURNAMENT_DETAIL = 'tournament/getTournamentDetail'
export const GET_ENTRY_STATUS = 'tournament/getEntryStatus'
export const JOIN_TOURNAMENT = 'tournament/joinTournament'
export const LEAVE_TOURNAMENT = 'tournament/leaveTournament'
export const GET_TOURNAMENT_PARTICIPANTS = 'tournament/getTournamentParticipants'
export const GET_TOURNAMENT_INTERESTEDS = 'tournament/getTournamentInteresteds'
