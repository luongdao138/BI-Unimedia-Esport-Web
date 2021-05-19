import { createReducer } from '@reduxjs/toolkit'
import * as actions from '../actions'
import { CommonResponse, ProfileResponse, HistoryResponse, Nickname2, Meta } from '@services/user.service'
import { registerProfile, logout } from '@store/auth/actions'
import { blockUser, unblockUser } from '@store/block/actions'
import { UPLOADER_TYPE } from '@constants/image.constants'

type StateType = {
  data: ProfileResponse['data']
  lastSeenUserData: ProfileResponse['data']
  tournamentHistories?: Array<HistoryResponse>
  tournamentHistoriesMeta?: Meta
  activityLogs?: Array<any>
  recommendations: Array<any>
  nicknames2?: Array<Nickname2>
  recommendedEvent: Array<CommonResponse>
}

const initialState: StateType = {
  data: undefined,
  lastSeenUserData: undefined,
  tournamentHistories: [],
  activityLogs: [],
  recommendations: [],
  nicknames2: [],
  recommendedEvent: [],
}

export default createReducer(initialState, (builder) => {
  builder.addCase(actions.getUserProfile.fulfilled, (state, action) => {
    state.data = action.payload.data
  })

  builder.addCase(actions.getMemberProfile.fulfilled, (state, action) => {
    state.lastSeenUserData = action.payload.data
  })

  builder.addCase(actions.profileUpdate.fulfilled, (state, action) => {
    state.data.attributes = { ...state.data.attributes, ...action.payload.data.attributes }
  })

  builder.addCase(actions.profileImage.fulfilled, (state, action) => {
    if (action.payload.file_type === UPLOADER_TYPE.USER_PROFILE) {
      state.data.attributes.avatar_url = action.payload.image_url
    } else {
      state.data.attributes.cover_url = action.payload.image_url
    }
  })

  builder.addCase(registerProfile.fulfilled, (state, action) => {
    state.data.attributes = { ...state.data.attributes, ...action.payload.data.attributes }
  })

  builder.addCase(actions.tournamentHistorySearch.fulfilled, (state, action) => {
    let tmpHistories = action.payload.data
    if (action.payload.links != undefined && action.payload.links.meta.current_page > 1) {
      tmpHistories = state.tournamentHistories.concat(action.payload.data)
    }

    state.tournamentHistories = tmpHistories
    state.tournamentHistoriesMeta = action.payload.links?.meta
  })

  builder.addCase(actions.getActivityLogs.fulfilled, (state, action) => {
    state.activityLogs = action.payload.data
  })

  builder.addCase(actions.getNicknames.fulfilled, (state, action) => {
    state.nicknames2 = action.payload.data.attributes.nicknames
  })

  builder.addCase(actions.profileEdit.fulfilled, (state, action) => {
    state.data = action.payload.data
  })

  builder.addCase(actions.gameEdit.fulfilled, (state, action) => {
    state.data = action.payload.data
  })

  builder.addCase(actions.getRecommendations.fulfilled, (state, action) => {
    state.recommendations = action.payload.data
  })

  builder.addCase(logout.fulfilled, (state) => {
    state.data = undefined
  })

  builder.addCase(actions.getRecommendedEvent.fulfilled, (state, action) => {
    state.recommendedEvent = action.payload.data
  })

  builder.addCase(blockUser.fulfilled, (state) => {
    state.lastSeenUserData.attributes.is_blocked = true
  })

  builder.addCase(unblockUser.fulfilled, (state) => {
    state.lastSeenUserData.attributes.is_blocked = false
  })
})
