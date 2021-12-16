import { useAppDispatch, useAppSelector } from '@store/hooks'
import { ArchiveListType } from '@services/settings.service'
import archivedListStore from '@store/archivedlist'

const { selectors, actions } = archivedListStore

const useArchivedList = () => {
  const dispatch = useAppDispatch()
  const getVideoArchivedList = (params: ArchiveListType) => {
    dispatch(actions.getArchiveList(params))
  }
  const videoArchivedList = useAppSelector(selectors.getArchiveVideoList)
  const getVideoArchivedDetail = async (params, onSuccess?: (canEdit, isSchedule) => void) => {
    const result = await dispatch(actions.getArchiveDetail(params))
    if (actions.getArchiveDetail.fulfilled.match(result)) {
      const { data } = result?.payload
      const canEdit = !!data
      const isSchedule = data?.scheduled_flag === 1
      onSuccess(canEdit, isSchedule)
    }
  }
  const videoArchivedDetail = useAppSelector(selectors.getArchiveVideoDetail)
  const updateVideoDetail = async (params) => {
    const result = await dispatch(actions.updateArchiveVideoDetail(params))
    if (actions.updateArchiveVideoDetail.fulfilled.match(result)) {
      // TODO
    }
  }
  return {
    videoArchivedList,
    getVideoArchivedList,
    getVideoArchivedDetail,
    videoArchivedDetail,
    updateVideoDetail,
  }
}

export default useArchivedList
