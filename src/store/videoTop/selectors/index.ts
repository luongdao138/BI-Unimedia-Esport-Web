import { RootState } from '@store/store'
import { createSelector } from 'reselect'

const getRoot = (state: RootState) => state.videoTop

export const getAllVideo = createSelector(getRoot, (state) => state.listVideoAll)
export const getVideoLive = createSelector(getRoot, (state) => state.listVideoAll.live)
export const getVideoSchedule = createSelector(getRoot, (state) => state.listVideoAll.schedule)
export const getVideoArchive = createSelector(getRoot, (state) => state.listVideoAll.archived)
export const getVideoPopular = createSelector(getRoot, (state) => state.listVideoPopular)
export const getBannerTop = createSelector(getRoot, (state) => state.listBanner)
export const liveVideos = createSelector(getRoot, (state) => state.videoLive)
export const scheduleVideos = createSelector(getRoot, (state) => state.videoSchedule)
export const archivedVideos = createSelector(getRoot, (state) => state.videoArchived)
export const getAllVideoFavorite = createSelector(getRoot, (state) => state.listVideoFavorite)
export const videoSearchResult = createSelector(getRoot, (state) => state.listVideoSearch)
export const totalSearchResult = createSelector(getRoot, (state) => state.totalResult)
export const videoDetailResult = createSelector(getRoot, (state) => state.videoDetailData)
export const userStreamerResult = createSelector(getRoot, (state) => state.userDetailData)
export const streamingSecond = createSelector(getRoot, (state) => state.streaming_second)
export const playedSecond = createSelector(getRoot, (state) => state.played_second)
export const isViewingStream = createSelector(getRoot, (state) => state.is_viewing_stream)
export const liveStreamInfo = createSelector(getRoot, (state) => state)
