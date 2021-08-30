import { LIMIT_ITEM, ListVideoTopParams, TypeVideo, TYPE_VIDEO_TOP } from '@services/videoTop.services'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import { Meta } from '@store/metadata/actions/types'
import { createMetaSelector } from '@store/metadata/selectors'
import videoTop from '@store/videoTop'

const { selectors, actions } = videoTop
const _getListVideo = createMetaSelector(actions.getVideoSchedule)
const useScheduleVideos = (): {
  listScheduleVideo: TypeVideo[]
  meta: Meta
  loadMore: (page: number, follow: number) => void
  resetScheduleVideos: () => void
  getListVideoTop: (params: ListVideoTopParams) => void
} => {
  const dispatch = useAppDispatch()
  const listScheduleVideo = useAppSelector(selectors.scheduleVideos)
  const meta = useAppSelector(_getListVideo)
  const getListVideoTop = (params: ListVideoTopParams) => dispatch(actions.getVideoSchedule(params))
  const loadMore = (page: number, follow: number) => {
    if (listScheduleVideo.length > 0 && listScheduleVideo.length <= LIMIT_ITEM) {
      getListVideoTop({ type: TYPE_VIDEO_TOP.SCHEDULE, page: page, limit: LIMIT_ITEM, follow: follow })
    }
  }

  const resetScheduleVideos = () => dispatch(actions.resetSchedule())

  // useEffect(() => {
  //   if (listScheduleVideo.length === 0) {
  //     getListVideoTop({ type: TYPE_VIDEO_TOP.SCHEDULE, page: 1, limit: LIMIT })
  //   }
  // }, [])

  return {
    listScheduleVideo,
    meta,
    loadMore,
    resetScheduleVideos,
    getListVideoTop,
  }
}

export default useScheduleVideos
