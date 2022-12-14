import { useAppDispatch, useAppSelector } from '@store/hooks'
import { ArchiveListType } from '@services/settings.service'
import archivedListStore from '@store/archivedlist'
import { GetCookieRequestParams, TYPE_VIDEO_ARCHIVE } from '@services/archiveList.service'
import { createMetaSelector } from '@store/metadata/selectors'

const { selectors, actions } = archivedListStore
const _getArchiveList = createMetaSelector(actions.getArchiveList)
const _getArchiveDetail = createMetaSelector(actions.getArchiveDetail)
const _getCookie = createMetaSelector(actions.getCookieDownloadVideo)

const useArchivedList = () => {
  const dispatch = useAppDispatch()
  const getVideoArchivedList = (params: ArchiveListType) => {
    dispatch(actions.getArchiveList(params))
  }
  const meta_archive_list = useAppSelector(_getArchiveList)
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
  const meta_archive_detail = useAppSelector(_getArchiveDetail)
  const videoArchivedDetail = useAppSelector(selectors.getArchiveVideoDetail)
  const updateVideoDetail = async (params, callback: (isSuccess, message, data) => void) => {
    const result = await dispatch(actions.updateArchiveVideoDetail(params))
    if (actions.updateArchiveVideoDetail.fulfilled.match(result)) {
      const { data, code, message } = result.payload
      callback(code === 200, message, data)
    }
  }
  const overrideVideoArchive = (videoData: TYPE_VIDEO_ARCHIVE) => {
    dispatch(actions.overrideArchiveVideo(videoData))
  }
  const deleteVideoDetail = async (params, callback: (isSuccess, message) => void) => {
    const result = await dispatch(actions.deleteArchiveVideo(params))
    if (actions.deleteArchiveVideo.fulfilled.match(result)) {
      const { code, message } = result.payload
      callback(code === 200, message)
    }
  }
  const overrideDeleteVideo = (uuid: string) => {
    dispatch(actions.overrideDeleteVideo({ uuid }))
  }
  const meta_cookie_video = useAppSelector(_getCookie)
  const getCookieVideoDownload = async (params: GetCookieRequestParams, onSuccess: (data) => void) => {
    const result = await dispatch(actions.getCookieDownloadVideo(params))
    if (actions.getCookieDownloadVideo.fulfilled.match(result)) {
      const { data } = result?.payload
      onSuccess(data)
    }
  }
  return {
    videoArchivedList,
    getVideoArchivedList,
    getVideoArchivedDetail,
    videoArchivedDetail,
    updateVideoDetail,
    overrideVideoArchive,
    deleteVideoDetail,
    overrideDeleteVideo,
    meta_archive_list,
    meta_archive_detail,
    getCookieVideoDownload,
    meta_cookie_video,
  }
}

export default useArchivedList
