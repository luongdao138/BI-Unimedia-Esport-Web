import { useAppDispatch, useAppSelector } from '@store/hooks'
import userProfileStore from '@store/userProfile'
import community from '@store/community'
import { createMetaSelector } from '@store/metadata/selectors'
import { clearMetaData } from '@store/metadata/actions'

const { selectors } = userProfileStore
const { actions } = community
const getCommunityListMeta = createMetaSelector(actions.getCommunityList)

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useUserData = () => {
  const dispatch = useAppDispatch()
  const userProfile = useAppSelector(selectors.getUserProfile)
  const communityList = useAppSelector(community.selectors.getCommunityList)
  // const page = useAppSelector(selectors.getTourHistoriesMeta)
  const meta = useAppSelector(getCommunityListMeta)
  const getCommunityList = () => dispatch(actions.getCommunityList())
  const resetMeta = () => dispatch(clearMetaData(actions.getCommunityList.typePrefix))
  return { userProfile, communityList, getCommunityList, resetMeta, meta }
}

export default useUserData
