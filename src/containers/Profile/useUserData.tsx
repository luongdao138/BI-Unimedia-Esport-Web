import { useAppDispatch, useAppSelector } from '@store/hooks'
import userProfileStore from '@store/userProfile'
import community from '@store/community'
import { createMetaSelector } from '@store/metadata/selectors'
import { clearMetaData } from '@store/metadata/actions'

const userSelectors = userProfileStore.selectors
const userActions = userProfileStore.actions
const communitySelectors = community.selectors
const communityActions = community.actions
const getCommunityListMeta = createMetaSelector(communityActions.getCommunityList)
const getUserMeta = createMetaSelector(userActions.getMemberProfile)

const useUserData = (others: boolean): any => {
  const dispatch = useAppDispatch()
  let userProfile = null
  userProfile = useAppSelector(userSelectors.getUserProfile)
  let communityList = null
  const userMeta = useAppSelector(getUserMeta)
  const communityMeta = useAppSelector(getCommunityListMeta)
  const getCommunityList = () => dispatch(communityActions.getCommunityList())
  const getMemberProfile = (user_code: string) => dispatch(userActions.getMemberProfile(user_code))
  if (others) {
    userProfile = useAppSelector(userSelectors.getLastSeenUserData)
    //TODO fix
    communityList = useAppSelector(communitySelectors.getCommunityList)
  } else {
    userProfile = useAppSelector(userSelectors.getUserProfile)
    communityList = useAppSelector(communitySelectors.getCommunityList)
  }
  const resetCommunityMeta = () => dispatch(clearMetaData(communityActions.getCommunityList.typePrefix))
  const resetUserMeta = () => dispatch(clearMetaData(userActions.getMemberProfile.typePrefix))
  return { userProfile, communityList, getCommunityList, getMemberProfile, resetCommunityMeta, resetUserMeta, userMeta, communityMeta }
}

export default useUserData
