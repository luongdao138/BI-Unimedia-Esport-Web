/* eslint-disable no-console */
import { useAppDispatch, useAppSelector } from '@store/hooks'
import userProfileStore from '@store/userProfile'
import community from '@store/community'
import { createMetaSelector } from '@store/metadata/selectors'
import { clearMetaData } from '@store/metadata/actions'
import { UPLOADER_TYPE, ACTION_TYPE } from '@constants/image.constants'
import { RESPONSE_STATUS } from '@constants/common.constants'
import { getPreSignedUrl, upload } from '@services/image.service'

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

  // const progressListener = (progress: number) => {
  //   console.log('progressListener ', progress)
  // }
  const avatarChange = async (file: File, user_id: number) => {
    const params = {
      type: UPLOADER_TYPE.AVATAR,
      fileName: file.name,
      contentType: file.type,
      room: user_id,
      action_type: ACTION_TYPE.CREATE,
    }
    try {
      const res = await getPreSignedUrl(params)
      const file_url = res.file_url
      const signed_url = res.url
      const u_res = await upload(file, signed_url)
      if (u_res === RESPONSE_STATUS.SUCCESS) {
        const params = {
          user_id: user_id,
          image_url: 'https://' + file_url,
          file_type: UPLOADER_TYPE.USER_PROFILE,
        }
        dispatch(userActions.profileImage(params))
      }
    } catch (error) {
      console.log('useUserData.tsx 44 getPreSignedUrl failed', error)
    }
  }
  const resetCommunityMeta = () => dispatch(clearMetaData(communityActions.getCommunityList.typePrefix))
  const resetUserMeta = () => dispatch(clearMetaData(userActions.getMemberProfile.typePrefix))
  return {
    userProfile,
    communityList,
    getCommunityList,
    getMemberProfile,
    resetCommunityMeta,
    resetUserMeta,
    avatarChange,
    userMeta,
    communityMeta,
  }
}

export default useUserData
