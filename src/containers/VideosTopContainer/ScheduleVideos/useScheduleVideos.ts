import { ListVideoTopParams, TypeVideo } from '@services/videoTop.services'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import { Meta } from '@store/metadata/actions/types'
import { createMetaSelector } from '@store/metadata/selectors'
import videoTop from '@store/videoTop'

const { selectors, actions } = videoTop
const _getListVideo = createMetaSelector(actions.getVideoSchedule)
const useScheduleVideos = (): {
  listScheduleVideo: TypeVideo[]
  meta: Meta
  resetScheduleVideos: () => void
  getListVideoTop: (params: ListVideoTopParams) => void
} => {
  const dispatch = useAppDispatch()
  const listScheduleVideo = useAppSelector(selectors.scheduleVideos)
  const meta = useAppSelector(_getListVideo)
  const getListVideoTop = (params: ListVideoTopParams) => dispatch(actions.getVideoSchedule(params))

  const resetScheduleVideos = () => dispatch(actions.resetSchedule())

  return {
    listScheduleVideo,
    meta,
    resetScheduleVideos,
    getListVideoTop,
  }
}

export default useScheduleVideos
