import { createReducer } from '@reduxjs/toolkit'
import {
  BannerItem,
  CategoryPopularData,
  DetailUserData,
  SearchType,
  TypeVideo,
  VideoDetailData,
  VideoRefType,
  VideoGiftMasterData,
  RankingsItem,
  ReportReason,
} from '@services/videoTop.services'
import * as actions from '../actions'
import { VIDEO_NORMAL_VIEW_MODE, SUB_TABS, VIDEO_TABS } from '@constants/common.constants'

const defaultChatState = {
  seek_count: 0,
  seeked_second: 0,
  // activeTab: VIDEO_TABS.CHAT,
  // activeSubTab: SUB_TABS.MESS.ALL,
}

type StateType = {
  listVideoAll?: {
    live?: Array<TypeVideo>
    schedule?: Array<TypeVideo>
    archived?: Array<TypeVideo>
  }
  listVideoPopular?: Array<CategoryPopularData>
  listBanner?: Array<BannerItem>
  videoLive?: Array<TypeVideo>
  videoSchedule?: Array<TypeVideo>
  videoArchived?: Array<TypeVideo>
  listVideoFavorite?: {
    live?: Array<TypeVideo>
    schedule?: Array<TypeVideo>
    archived?: Array<TypeVideo>
  }
  videoSearch?: SearchType
  listVideoSearch?: Array<TypeVideo>
  totalResult?: number
  videoDetailData?: VideoDetailData
  userDetailData?: DetailUserData
  streaming_second?: number
  played_second?: number
  is_viewing_stream?: boolean
  is_end_live?: boolean
  seek_count?: number
  videoDetailError?: any
  seeked_second?: number
  is_pausing_live?: boolean
  is_streaming_end?: boolean
  video_view_mode?: string
  is_normal_view_mode?: boolean
  activeTab?: number
  activeSubTab?: number
  isHoveredVideo?: boolean
  videoEl?: VideoRefType
  videoGiftMaster?: VideoGiftMasterData
  videoGiftMasterLoading?: boolean
  giver_rankings: Array<RankingsItem>
  receiver_rankings: Array<RankingsItem>
  streamer: {
    uuid?: string
    user_avatar?: string
    user_nickname?: string
  }
  videoReportReasons: Array<ReportReason>
  isLoadingVideoReportReasons: boolean
  videoDetailTipFunctionVisible: number
}

const initialState: StateType = {
  listVideoAll: {
    live: [],
    schedule: [],
    archived: [],
  },
  listVideoPopular: [],
  listBanner: [],
  videoLive: [],
  videoSchedule: [],
  videoArchived: [],
  listVideoFavorite: {
    live: [],
    schedule: [],
    archived: [],
  },
  videoSearch: {
    total: 0,
    videos: [],
  },
  listVideoSearch: [],
  totalResult: 0,
  videoDetailData: {},
  videoDetailError: null,
  userDetailData: {
    uuid: '',
    like: 0,
    unlike: 0,
    follow: 0,
    buy_ticket: 0,
    streamer: 0,
  },
  // state for live stream info
  streaming_second: 0,
  played_second: 0,
  is_end_live: false,
  ...defaultChatState,
  is_pausing_live: false,
  is_streaming_end: false,
  video_view_mode: VIDEO_NORMAL_VIEW_MODE,
  is_normal_view_mode: true,
  activeTab: VIDEO_TABS.CHAT,
  activeSubTab: SUB_TABS.MESS.ALL,
  isHoveredVideo: false,
  videoEl: {
    videoQuery: null,
    videoElement: null,
  },
  videoGiftMaster: null,
  videoGiftMasterLoading: false,
  giver_rankings: [],
  receiver_rankings: [],
  streamer: { uuid: '', user_avatar: '', user_nickname: '' },
  videoReportReasons: [],
  isLoadingVideoReportReasons: false,
  videoDetailTipFunctionVisible: 1,
}

export default createReducer(initialState, (builder) => {
  builder.addCase(actions.getListVideoAll.fulfilled, (state, action) => {
    const listVideo = action.payload.data
    state.listVideoAll = listVideo
  })
  builder.addCase(actions.getCategoryPopularVideo.fulfilled, (state, action) => {
    const videoPopular = action.payload.data
    state.listVideoPopular = videoPopular
  })
  builder.addCase(actions.getBannerTop.fulfilled, (state, action) => {
    const listBanner = action.payload.data
    state.listBanner = listBanner
  })
  builder.addCase(actions.getVideoLive.fulfilled, (state, action) => {
    let listVideoLive = action.payload.data.live
    if (action.meta.arg.page > 1) {
      listVideoLive = state.videoLive.concat(action.payload.data.live)
    }
    state.videoLive = listVideoLive
  })
  builder.addCase(actions.getVideoSchedule.fulfilled, (state, action) => {
    let listVideoSchedule = action.payload.data.schedule
    if (action.meta.arg.page > 1) {
      listVideoSchedule = state.videoSchedule.concat(action.payload.data.schedule)
    }
    state.videoSchedule = listVideoSchedule
  })
  builder.addCase(actions.getVideoArchived.fulfilled, (state, action) => {
    let listVideoArchived = action.payload.data.archived
    if (action.meta.arg.page > 1) {
      listVideoArchived = state.videoArchived.concat(action.payload.data.archived)
    }
    state.videoArchived = listVideoArchived
  })
  builder.addCase(actions.getListVideoFavorite.fulfilled, (state, action) => {
    const listVideo = action.payload.data
    state.listVideoFavorite = listVideo
  })
  builder.addCase(actions.videoSearch.fulfilled, (state, action) => {
    let arrayVideo = action.payload.data.videos
    const total = action.payload.data.total
    if (action.meta.arg.page > 1) {
      arrayVideo = state.listVideoSearch.concat(action.payload.data.videos)
    }
    state.listVideoSearch = arrayVideo
    state.totalResult = total
  })
  builder.addCase(actions.resetSearchVideo, (state) => {
    state.listVideoSearch = []
    state.totalResult = 0
  })
  builder.addCase(actions.resetLive, (state) => {
    state.videoLive = []
  })
  builder.addCase(actions.resetSchedule, (state) => {
    state.videoSchedule = []
  })
  builder.addCase(actions.resetArchive, (state) => {
    state.videoArchived = []
  })
  builder.addCase(actions.videoDetail.fulfilled, (state, action) => {
    const videoData = action.payload.data.video
    const userData = action.payload.data.user
    state.videoDetailData = videoData
    state.userDetailData = userData ? userData : state.userDetailData
  })
  builder.addCase(actions.resetVideoDetail, (state) => {
    state.videoDetailData = {}
    state.userDetailData
  })
  builder.addCase(actions.videoDetail.rejected, (state, action) => {
    // const videoData = action.payload.data.video
    // const userData = action.payload.data.user
    state.videoDetailError = action.payload
    // state.userDetailData = userData
  })
  builder.addCase(actions.resetVideoDetailError, (state) => {
    state.videoDetailError = null
  })

  // action for live stream info
  builder.addCase(actions.changeStreamingSecond, (state, action) => {
    state.streaming_second = action.payload.streaming_second
  })
  builder.addCase(actions.changePlayedSecond, (state, action) => {
    state.played_second = action.payload.played_second
  })
  builder.addCase(actions.changeIsViewingStream, (state, action) => {
    state.is_viewing_stream = action.payload.is_viewing_stream
  })
  builder.addCase(actions.changeVideoTime, (state, action) => {
    state.streaming_second = action.payload.streaming_second
    state.played_second = action.payload.played_second
  })
  builder.addCase(actions.changeIsEndLive, (state, action) => {
    state.is_end_live = action.payload.is_end_live
  })
  builder.addCase(actions.changeSeekCount, (state, action) => {
    state.seek_count = state.seek_count + 1
    state.seeked_second = action.payload.seeked_second
  })
  builder.addCase(actions.changeIsPausingLive, (state, action) => {
    state.is_pausing_live = action.payload.is_pausing_live
  })
  builder.addCase(actions.changeIsStreamingEnd, (state, action) => {
    state.is_streaming_end = action.payload.is_streaming_end
  })
  builder.addCase(actions.resetState, () => {
    return { ...initialState }
  })
  builder.addCase(actions.resetChatState, (state) => {
    return { ...state, ...defaultChatState }
  })
  builder.addCase(actions.changeVideoViewMode, (state, action) => {
    state.is_normal_view_mode = action.payload.is_normal_view_mode
  })

  builder.addCase(actions.setActiveTab, (state, action) => {
    state.activeTab = action.payload.activeTab
  })
  builder.addCase(actions.setActiveSubTab, (state, action) => {
    state.activeSubTab = action.payload.activeSubTab
  })
  builder.addCase(actions.changeIsHoveredVideoStatus, (state, action) => {
    state.isHoveredVideo = action.payload.isHoveredVideo
  })
  builder.addCase(actions.saveVideoRef, (state, action) => {
    state.videoEl.videoQuery = action.payload.videoQuery
    state.videoEl.videoElement = action.payload.videoElement
  })
  builder.addCase(actions.getVideoGiftMaster.pending, (state) => {
    state.videoGiftMasterLoading = true
    state.videoGiftMaster = null
  })
  builder.addCase(actions.getVideoGiftMaster.fulfilled, (state, action) => {
    state.videoGiftMasterLoading = false
    state.videoGiftMaster = action.payload.data
  })
  builder.addCase(actions.getVideoGiftMaster.rejected, (state) => {
    state.videoGiftMasterLoading = false
  })

  // get ranking video
  builder.addCase(actions.getRankingList.fulfilled, (state, action) => {
    state.giver_rankings = action.payload.data.giver
    state.receiver_rankings = action.payload.data.receive
    state.streamer = action.payload.data.streamer
  })

  builder.addCase(actions.updateUseGiftFlag, (state, action) => {
    state.videoDetailData = {
      ...state.videoDetailData,
      use_gift: action.payload.isUseGift,
    }
  })
  builder.addCase(actions.getReportReason.fulfilled, (state, action) => {
    state.isLoadingVideoReportReasons = false
    state.videoReportReasons = action.payload.data
  })
  builder.addCase(actions.getReportReason.rejected, (state) => {
    state.isLoadingVideoReportReasons = false
    state.videoReportReasons = []
  })
  builder.addCase(actions.getReportReason.pending, (state) => {
    state.isLoadingVideoReportReasons = true
  })
  builder.addCase(actions.updateTipFunctionVisibleState, (state, action) => {
    state.videoDetailTipFunctionVisible = action.payload.isVisible
  })
})
