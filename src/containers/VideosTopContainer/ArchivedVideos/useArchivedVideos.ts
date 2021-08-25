import { ListVideoTopParams, TypeVideo, TYPE_VIDEO_TOP } from '@services/videoTop.services'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import { Meta } from '@store/metadata/actions/types'
import { createMetaSelector } from '@store/metadata/selectors'
import videoTop from '@store/videoTop'
import { useEffect } from 'react'

const LIMIT = 15
const { selectors, actions } = videoTop
const _getListVideo = createMetaSelector(actions.getVideoArchived)
const useArchivedVideos = (): {
  listArchivedVideo: TypeVideo[]
  meta: Meta
  loadMore: (page: number) => void
} => {
  const dispatch = useAppDispatch()
  const listArchivedVideo = useAppSelector(selectors.archivedVideos)
  const meta = useAppSelector(_getListVideo)
  const getListVideoTop = (params: ListVideoTopParams) => dispatch(actions.getVideoArchived(params))
  const loadMore = (page: number) => {
    if (listArchivedVideo.length > 0 && listArchivedVideo.length <= LIMIT) {
      getListVideoTop({ type: TYPE_VIDEO_TOP.ARCHIVE, page: page, limit: LIMIT })
    }
  }

  useEffect(() => {
    if (listArchivedVideo.length === 0) {
      getListVideoTop({ type: TYPE_VIDEO_TOP.ARCHIVE, page: 1, limit: LIMIT })
    }
  }, [])

  return {
    listArchivedVideo,
    meta,
    loadMore,
  }
}

export default useArchivedVideos
