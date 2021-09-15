import { useAppDispatch, useAppSelector } from '@store/hooks'
import { createMetaSelector } from '@store/metadata/selectors'
import { clearMetaData } from '@store/metadata/actions'
import communityStore from '@store/community'
import { CommunitySearchParams } from '@services/community.service'

const { selectors, actions } = communityStore
const getCommunitySearchMeta = createMetaSelector(actions.communitySearch)

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useCommunitySearch = () => {
  const dispatch = useAppDispatch()
  const communityResult = useAppSelector(selectors.getSearchCommunity)
  const page = useAppSelector(selectors.getSearchCommunityMeta)
  const meta = useAppSelector(getCommunitySearchMeta)

  const searchCommunity = (param: CommunitySearchParams) => dispatch(actions.communitySearch(param))
  const resetMeta = () => dispatch(clearMetaData(actions.communitySearch.typePrefix))
  const resetSearchCommunity = () => dispatch(actions.resetSearchCommunity())
  return { communityResult, searchCommunity, resetMeta, resetSearchCommunity, meta, page }
}

export default useCommunitySearch
