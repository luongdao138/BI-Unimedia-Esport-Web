import { ListVideoTopParams, TypeVideo, TYPE_VIDEO_TOP } from '@services/videoTop.services'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import { Meta } from '@store/metadata/actions/types'
import { createMetaSelector } from '@store/metadata/selectors'
import videoTop from '@store/videoTop'
import { useEffect } from 'react'

const LIMIT = 15
const { selectors, actions } = videoTop
const _getListVideoLive = createMetaSelector(actions.getVideoLive)
const useLiveVideos = (): {
  listLiveVideo: TypeVideo[]
  meta: Meta
  loadMore: (page: number) => void
} => {
  const dispatch = useAppDispatch()
  const listLiveVideo = useAppSelector(selectors.liveVideos)
  const meta = useAppSelector(_getListVideoLive)
  const getListVideoTop = (params: ListVideoTopParams) => dispatch(actions.getVideoLive(params))
  const loadMore = (page: number) => {
    if (listLiveVideo.length > 0 && listLiveVideo.length <= LIMIT) {
      getListVideoTop({ type: TYPE_VIDEO_TOP.LIVE, page: page, limit: LIMIT })
    }
  }

  useEffect(() => {
    getListVideoTop({ type: TYPE_VIDEO_TOP.LIVE, page: 1, limit: LIMIT })
  }, [])

  return {
    listLiveVideo,
    meta,
    loadMore,
  }
}

export default useLiveVideos
