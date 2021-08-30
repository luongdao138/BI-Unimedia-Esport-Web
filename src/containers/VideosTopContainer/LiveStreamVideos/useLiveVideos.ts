import { LIMIT_ITEM, ListVideoTopParams, TypeVideo, TYPE_VIDEO_TOP } from '@services/videoTop.services'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import { Meta } from '@store/metadata/actions/types'
import { createMetaSelector } from '@store/metadata/selectors'
import videoTop from '@store/videoTop'

const { selectors, actions } = videoTop
const _getListVideoLive = createMetaSelector(actions.getVideoLive)
const useLiveVideos = (): {
  listLiveVideo: TypeVideo[]
  meta: Meta
  loadMore: (page: number, follow: number) => void
  getListVideoTop: (params: ListVideoTopParams) => void
  resetLiveVideos: () => void
} => {
  const dispatch = useAppDispatch()
  const listLiveVideo = useAppSelector(selectors.liveVideos)
  const meta = useAppSelector(_getListVideoLive)
  const getListVideoTop = (params: ListVideoTopParams) => dispatch(actions.getVideoLive(params))
  const loadMore = (page: number, follow: number) => {
    if (listLiveVideo.length > 0 && listLiveVideo.length <= LIMIT_ITEM) {
      getListVideoTop({ type: TYPE_VIDEO_TOP.LIVE, page: page, limit: LIMIT_ITEM, follow: follow })
    }
  }
  const resetLiveVideos = () => dispatch(actions.resetLive())

  // useEffect(() => {
  //   if (listLiveVideo.length === 0) {
  //     getListVideoTop({ type: TYPE_VIDEO_TOP.LIVE, page: 1, limit: LIMIT })
  //   }
  // }, [])

  return {
    listLiveVideo,
    meta,
    loadMore,
    getListVideoTop,
    resetLiveVideos,
  }
}

export default useLiveVideos
