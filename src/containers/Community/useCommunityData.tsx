import { useAppDispatch, useAppSelector } from '@store/hooks'
import { createMetaSelector } from '@store/metadata/selectors'
import { clearMetaData } from '@store/metadata/actions'
import { CommunityListParams } from '@services/community.service'
import communityStore from '@store/community'
import { getIsAuthenticated } from '@store/auth/selectors'

const { selectors, actions } = communityStore
const getCommunitiesMeta = createMetaSelector(actions.getCommunityList)

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useCommunityData = () => {
  const dispatch = useAppDispatch()
  const isAuthenticated = useAppSelector(getIsAuthenticated)
  const communities = useAppSelector(selectors.getCommunityList)
  const pages = useAppSelector(selectors.getCommunityListMeta)
  const meta = useAppSelector(getCommunitiesMeta)
  const fetchCommunityData = (param: CommunityListParams) =>
    dispatch(isAuthenticated ? actions.getCommunityList(param) : actions.getCommunityListPublic(param))
  const resetMeta = () => dispatch(clearMetaData(actions.getCommunityList.typePrefix))
  const clearCommunityData = () => dispatch(actions.clearCommunityData())

  return { communities, meta, pages, fetchCommunityData, resetMeta, clearCommunityData }
}

export default useCommunityData
