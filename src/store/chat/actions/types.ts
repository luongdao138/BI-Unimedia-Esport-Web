export enum MESSAGE_ACTION_TYPE {
  GET_FRIEND_LIST = 'chat/getFriendList',
  DIRECT_ROOM_CHECK = 'chat/directRoomCheck',
  GET_TOURNAMENT_DETAIL = 'chat/tournamentDetail',
  RESET_ADD_USERS = 'chat/resetAddUsers',
  RESET_DM_ROOM = 'chat/resetDmRoom',
}

export type PageMeta = {
  current_page?: number
  per_page?: number
  total_count?: number
  total_pages?: number
}
