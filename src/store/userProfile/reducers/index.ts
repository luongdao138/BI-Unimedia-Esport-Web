import { createReducer } from '@reduxjs/toolkit'
import * as actions from '../actions'
import { TournamentListItem } from '@services/arena.service'
import { CommonResponse, ProfileResponse, Nickname2, Meta, ChangeEmailSteps, FollowResponse } from '@services/user.service'
import { registerProfile, logout } from '@store/auth/actions'
import { blockUser, unblockUser } from '@store/block/actions'
import { UPLOADER_TYPE } from '@constants/image.constants'

type StateType = {
  data: ProfileResponse['data']
  lastSeenUserData: ProfileResponse['data']
  tournamentHistories?: Array<TournamentListItem>
  tournamentHistoriesMeta?: Meta
  activityLogs?: Array<any>
  activityLogsMeta?: Meta
  recommendations: Array<any>
  nicknames2?: Array<Nickname2>
  recommendedEvent: Array<CommonResponse>
  recommendedEventMeta: Meta
  accountSettingsChangeEmailSteps: ChangeEmailSteps
  followers?: Array<FollowResponse>
  followersMeta?: Meta
  following?: Array<FollowResponse>
  followingMeta?: Meta
}

const initialState: StateType = {
  data: undefined,
  lastSeenUserData: undefined,
  tournamentHistories: [],
  activityLogs: [],
  activityLogsMeta: undefined,
  recommendations: [],
  nicknames2: [],
  recommendedEvent: [],
  recommendedEventMeta: undefined,
  accountSettingsChangeEmailSteps: {
    step_check: false,
    step_change: false,
  },
  followers: [],
  following: [],
  followersMeta: undefined,
  followingMeta: undefined,
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
    if (action.payload.meta != undefined && action.payload.meta.current_page > 1) {
      tmpHistories = state.tournamentHistories.concat(action.payload.data)
    }

    state.tournamentHistories = tmpHistories
    state.tournamentHistoriesMeta = action.payload.meta
  })

  builder.addCase(actions.getActivityLogs.fulfilled, (state, action) => {
    let tmpActivityLogs = action.payload.data
    if (action.payload.meta != undefined && action.payload.meta.current_page > 1) {
      tmpActivityLogs = state.activityLogs.concat(action.payload.data)
    }
    state.activityLogs = tmpActivityLogs
    state.activityLogsMeta = action.payload.meta
  })

  builder.addCase(actions.follow.fulfilled, (state, _action) => {
    if (state.lastSeenUserData) state.lastSeenUserData.attributes.is_following = true
  })

  builder.addCase(actions.unfollow.fulfilled, (state, _action) => {
    if (state.lastSeenUserData) state.lastSeenUserData.attributes.is_following = false
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
    let tmpRecommendedEvent = action.payload.data
    if (action.payload.meta != undefined && action.payload.meta.current_page > 1) {
      tmpRecommendedEvent = state.recommendedEvent.concat(action.payload.data)
    }
    state.recommendedEvent = tmpRecommendedEvent
    state.recommendedEventMeta = action.payload.meta
  })

  builder.addCase(blockUser.fulfilled, (state) => {
    state.lastSeenUserData.attributes.is_blocked = true
  })

  builder.addCase(unblockUser.fulfilled, (state) => {
    state.lastSeenUserData.attributes.is_blocked = false
  })

  builder.addCase(actions.changeEmailConfirm.fulfilled, (state, action) => {
    state.data.attributes.email = action.payload.email
  })

  builder.addCase(actions.changeEmailCheck.fulfilled, (state) => {
    state.accountSettingsChangeEmailSteps.step_check = true
  })

  builder.addCase(actions.changeEmail.fulfilled, (state) => {
    state.accountSettingsChangeEmailSteps.step_change = true
  })

  builder.addCase(actions.clearChangeEmailSteps, (state) => {
    state.accountSettingsChangeEmailSteps.step_check = false
    state.accountSettingsChangeEmailSteps.step_change = false
  })

  builder
    .addCase(actions.clearHomeSettings, (state) => {
      state.data.attributes.home_settings = []
    })
    .addCase(actions.followers.fulfilled, (state, action) => {
      let tmpFollowers = action.payload.data
      if (action.payload.meta != undefined && action.payload.meta.current_page > 1) {
        tmpFollowers = state.followers.concat(action.payload.data)
      }

      state.followers = tmpFollowers
      state.followersMeta = action.payload.meta
    })
    .addCase(actions.clearFollowers, (state) => {
      state.followers = []
    })
    .addCase(actions.following.fulfilled, (state, action) => {
      let tmpFollowing = action.payload.data
      if (action.payload.meta != undefined && action.payload.meta.current_page > 1) {
        tmpFollowing = state.following.concat(action.payload.data)
      }

      state.following = tmpFollowing
      state.followingMeta = action.payload.meta
    })
    .addCase(actions.clearFollowing, (state) => {
      state.following = []
    })
    .addCase(actions.increaseFollowing.fulfilled, (state, action) => {
      if (state.following) {
        state.following.filter((user) => {
          if (user.attributes.user_code === action.payload) {
            user.attributes.is_following = true
          }
        })
      }
      if (state.followingMeta) state.followingMeta.total_count = state.followingMeta.total_count + 1
    })
    .addCase(actions.decreaseFollowing.fulfilled, (state, action) => {
      if (state.following) {
        state.following.filter((user) => {
          if (user.attributes.user_code === action.payload) {
            user.attributes.is_following = false
          }
        })
      }
      if (state.followingMeta && state.followingMeta.total_count > 0) state.followingMeta.total_count = state.followingMeta.total_count - 1
    })
})
