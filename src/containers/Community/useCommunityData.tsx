import { useAppDispatch, useAppSelector } from '@store/hooks'
import { createMetaSelector } from '@store/metadata/selectors'
import { clearMetaData } from '@store/metadata/actions'
import { CommunitySearchParams } from '@services/community.service'
import communityStore from '@store/community'

const { selectors, actions } = communityStore
const getCommunitiesMeta = createMetaSelector(actions.getCommunityList)

const useCommunityData = () => {
  const dispatch = useAppDispatch()
  const communities = useAppSelector(selectors.getCommunityList)
  const pages = useAppSelector(selectors.getCommunityListMeta)
  const meta = useAppSelector(getCommunitiesMeta)
  const fetchCommunityData = (param: CommunitySearchParams) => dispatch(actions.getCommunityList(param))
  const resetMeta = () => dispatch(clearMetaData(actions.getCommunityList.typePrefix))
  const clearCommunityData = () => dispatch(actions.clearCommunityData())

  return { communities, meta, pages, fetchCommunityData, resetMeta, clearCommunityData }
}

export default useCommunityData
