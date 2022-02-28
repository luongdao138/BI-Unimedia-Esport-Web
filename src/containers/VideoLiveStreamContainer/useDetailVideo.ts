import { RankingsParams, VideoDetailParams } from '@services/videoTop.services'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import { createMetaSelector } from '@store/metadata/selectors'
import videoTop from '@store/videoTop'

const { selectors, actions } = videoTop
const _getDetailMeta = createMetaSelector(actions.videoDetail)
const getRankingListMeta = createMetaSelector(actions.getRankingList)

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useDetailVideo = () => {
  const dispatch = useAppDispatch()

  const rankingListMeta = useAppSelector(getRankingListMeta)
  const detailVideoResult = useAppSelector(selectors.videoDetailResult)
  const userResult = useAppSelector(selectors.userStreamerResult)
  const getVideoDetail = (params: VideoDetailParams) => dispatch(actions.videoDetail(params))
  const resetVideoDetailData = () => dispatch(actions.resetVideoDetail())
  const meta = useAppSelector(_getDetailMeta)
  const streamingSecond = useAppSelector(selectors.streamingSecond)
  const playedSecond = useAppSelector(selectors.playedSecond)
  const isViewingStream = useAppSelector(selectors.isViewingStream)
  const liveStreamInfo = useAppSelector(selectors.liveStreamInfo)
  const changeStreamingSecond = (streaming_second) => dispatch(actions.changeStreamingSecond({ streaming_second }))
  const changeVideoTime = (streaming_second, played_second) =>
    dispatch(
      actions.changeVideoTime({
        streaming_second,
        played_second,
      })
    )
  const onSaveVideoRef = (videoQuery, videoElement) =>
    dispatch(
      actions.saveVideoRef({
        videoQuery,
        videoElement,
      })
    )
  const videoRefEl = useAppSelector(selectors.videoRef)
  const changePlayedSecond = (played_second) => dispatch(actions.changePlayedSecond({ played_second }))
  const changeIsViewingStream = (is_viewing_stream) => dispatch(actions.changeIsViewingStream({ is_viewing_stream }))
  const changeIsEndLive = (is_end_live) => dispatch(actions.changeIsEndLive({ is_end_live }))
  const changeSeekCount = (seeked_second) => dispatch(actions.changeSeekCount({ seeked_second }))
  const videoDetailError = useAppSelector(selectors.videoDetailError)
  const resetVideoDetailError = () => dispatch(actions.resetVideoDetailError())
  const changeIsPausingLive = (is_pausing_live) => dispatch(actions.changeIsPausingLive({ is_pausing_live }))
  const changeIsStreamingEnd = (is_streaming_end) => dispatch(actions.changeIsStreamingEnd({ is_streaming_end }))
  const resetState = () => dispatch(actions.resetState())
  const resetChatState = () => dispatch(actions.resetChatState())
  const changeVideoViewMode = (is_normal_view_mode) => dispatch(actions.changeVideoViewMode({ is_normal_view_mode }))
  const setActiveTab = (activeTab) => dispatch(actions.setActiveTab({ activeTab }))
  const setActiveSubTab = (activeSubTab) => dispatch(actions.setActiveSubTab({ activeSubTab }))
  const changeIsHoveredVideoStatus = (isHoveredVideo) => dispatch(actions.changeIsHoveredVideoStatus({ isHoveredVideo }))
  const getVideoGiftMasterList = (params) => dispatch(actions.getVideoGiftMaster(params))
  const videoGiftMaster = useAppSelector(selectors.videoGiftMaster)
  const videoGiftMasterLoading = useAppSelector(selectors.videoGiftMasterLoading)
  const giverRankings = useAppSelector(selectors.giverRankings)
  const receiverRankings = useAppSelector(selectors.receiverRankings)
  const fetchDonateRanking = (params: RankingsParams) => dispatch(actions.getRankingList(params))

  return {
    meta,
    detailVideoResult,
    userResult,
    getVideoDetail,
    resetVideoDetailData,
    changeStreamingSecond,
    streamingSecond,
    playedSecond,
    changePlayedSecond,
    changeIsViewingStream,
    isViewingStream,
    changeVideoTime,
    changeIsEndLive,
    liveStreamInfo,
    changeSeekCount,
    videoDetailError,
    resetVideoDetailError,
    changeIsPausingLive,
    changeIsStreamingEnd,
    resetState,
    changeVideoViewMode,
    setActiveTab,
    setActiveSubTab,
    resetChatState,
    changeIsHoveredVideoStatus,
    onSaveVideoRef,
    videoRefEl,
    getVideoGiftMasterList,
    videoGiftMaster,
    videoGiftMasterLoading,
    fetchDonateRanking,
    rankingListMeta,
    giverRankings,
    receiverRankings,
  }
}

export default useDetailVideo
