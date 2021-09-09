import { useAppDispatch, useAppSelector } from '@store/hooks'
import { createMetaSelector } from '@store/metadata/selectors'
import { clearMetaData } from '@store/metadata/actions'
import { CommunityListByUserParams } from '@services/community.service'
import communityStore from '@store/community'

const { selectors, actions } = communityStore
const getCommunitiesMeta = createMetaSelector(actions.getCommunityListByUser)

const useCommunityByUserData = () => {
  const dispatch = useAppDispatch()
  const communities = useAppSelector(selectors.getCommunityListByUser)
  const pages = useAppSelector(selectors.communitiesListByUserMeta)
  const meta = useAppSelector(getCommunitiesMeta)
  const fetchCommunityData = (param: CommunityListByUserParams) => dispatch(actions.getCommunityListByUser(param))
  const resetMeta = () => dispatch(clearMetaData(actions.getCommunityListByUser.typePrefix))
  const clearCommunityData = () => dispatch(actions.clearCommunityDataByUser())

  return { communities, meta, pages, fetchCommunityData, resetMeta, clearCommunityData }
}

export default useCommunityByUserData
