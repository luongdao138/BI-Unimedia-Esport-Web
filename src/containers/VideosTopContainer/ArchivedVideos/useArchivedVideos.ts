import { ListVideoTopParams, TypeVideo } from '@services/videoTop.services'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import { Meta } from '@store/metadata/actions/types'
import { createMetaSelector } from '@store/metadata/selectors'
import videoTop from '@store/videoTop'

const { selectors, actions } = videoTop
const _getListVideo = createMetaSelector(actions.getVideoArchived)
const useArchivedVideos = (): {
  listArchivedVideo: TypeVideo[]
  meta: Meta
  resetArchiveVideos: () => void
  getListVideoTop: (params: ListVideoTopParams) => void
} => {
  const dispatch = useAppDispatch()
  const listArchivedVideo = useAppSelector(selectors.archivedVideos)
  const meta = useAppSelector(_getListVideo)
  const getListVideoTop = (params: ListVideoTopParams) => dispatch(actions.getVideoArchived(params))

  const resetArchiveVideos = () => dispatch(actions.resetArchive())

  return {
    listArchivedVideo,
    meta,
    getListVideoTop,
    resetArchiveVideos,
  }
}

export default useArchivedVideos
