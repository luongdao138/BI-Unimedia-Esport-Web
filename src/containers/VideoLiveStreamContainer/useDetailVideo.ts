import { VideoDetailParams } from '@services/videoTop.services'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import { createMetaSelector } from '@store/metadata/selectors'
import videoTop from '@store/videoTop'

const { selectors, actions } = videoTop
const _getDetailMeta = createMetaSelector(actions.videoDetail)

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useDetailVideo = () => {
  const dispatch = useAppDispatch()

  const detailVideoResult = useAppSelector(selectors.videoDetailResult)
  const userResult = useAppSelector(selectors.userStreamerResult)
  const getVideoDetail = (params: VideoDetailParams) => dispatch(actions.videoDetail(params))
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
  const changePlayedSecond = (played_second) => dispatch(actions.changePlayedSecond({ played_second }))
  const changeIsViewingStream = (is_viewing_stream) => dispatch(actions.changeIsViewingStream({ is_viewing_stream }))
  const changeIsEndLive = (is_end_live) => dispatch(actions.changeIsEndLive({ is_end_live }))
  const changeSeekCount = () => dispatch(actions.changeSeekCount())
  const videoDetailError = useAppSelector(selectors.videoDetailError)
  const resetVideoDetailError = () => dispatch(actions.resetVideoDetailError())

  return {
    meta,
    detailVideoResult,
    userResult,
    getVideoDetail,
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
  }
}

export default useDetailVideo
