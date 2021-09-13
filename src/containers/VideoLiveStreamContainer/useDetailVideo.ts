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
  const changeStreamingSecond = (streaming_second) => dispatch(actions.changeStreamingSecond({ streaming_second }))

  return {
    meta,
    detailVideoResult,
    userResult,
    getVideoDetail,
    changeStreamingSecond,
    streamingSecond
  }
}

export default useDetailVideo
