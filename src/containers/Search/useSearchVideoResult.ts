import { useAppDispatch, useAppSelector } from '@store/hooks'
import { createMetaSelector } from '@store/metadata/selectors'
import { clearMetaData } from '@store/metadata/actions'
import videoTop from '@store/videoTop'
import { SearchVideoParams } from '@services/videoTop.services'

const { selectors, actions } = videoTop
const _getVideoSearchMeta = createMetaSelector(actions.videoSearch)

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useSearchVideoResult = () => {
  const dispatch = useAppDispatch()
  const searchVideosSelector = useAppSelector(selectors.videoSearchResult)
  const totalResult = useAppSelector(selectors.totalSearchResult)
  const meta = useAppSelector(_getVideoSearchMeta)
  const videoSearch = (param: SearchVideoParams) => dispatch(actions.videoSearch(param))
  const resetMeta = () => dispatch(clearMetaData(actions.videoSearch.typePrefix))
  const resetSearchVideo = () => dispatch(actions.resetSearchVideo())
  return { searchVideosSelector, videoSearch, resetMeta, resetSearchVideo, meta, totalResult }
}

export default useSearchVideoResult
