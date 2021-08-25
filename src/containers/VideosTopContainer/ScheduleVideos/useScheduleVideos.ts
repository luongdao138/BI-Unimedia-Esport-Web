import { ListVideoTopParams, TypeVideo, TYPE_VIDEO_TOP } from '@services/videoTop.services'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import { Meta } from '@store/metadata/actions/types'
import { createMetaSelector } from '@store/metadata/selectors'
import videoTop from '@store/videoTop'
import { useEffect } from 'react'

const LIMIT = 15
const { selectors, actions } = videoTop
const _getListVideo = createMetaSelector(actions.getVideoSchedule)
const useScheduleVideos = (): {
  listScheduleVideo: TypeVideo[]
  meta: Meta
  loadMore: (page: number) => void
} => {
  const dispatch = useAppDispatch()
  const listScheduleVideo = useAppSelector(selectors.scheduleVideos)
  const meta = useAppSelector(_getListVideo)
  const getListVideoTop = (params: ListVideoTopParams) => dispatch(actions.getVideoSchedule(params))
  const loadMore = (page: number) => {
    if (listScheduleVideo.length > 0 && listScheduleVideo.length <= LIMIT) {
      getListVideoTop({ type: TYPE_VIDEO_TOP.SCHEDULE, page: page, limit: LIMIT })
    }
  }

  useEffect(() => {
    getListVideoTop({ type: TYPE_VIDEO_TOP.SCHEDULE, page: 1, limit: LIMIT })
  }, [])

  return {
    listScheduleVideo,
    meta,
    loadMore,
  }
}

export default useScheduleVideos
