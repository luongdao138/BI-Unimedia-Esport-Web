/* eslint-disable no-console */
import { useAppDispatch, useAppSelector } from '@store/hooks'
import userProfileStore from '@store/userProfile'
import community from '@store/community'
import auth from '@store/auth'
import { createMetaSelector } from '@store/metadata/selectors'
// import { clearMetaData } from '@store/metadata/actions'
import { UPLOADER_TYPE, ACTION_TYPE } from '@constants/image.constants'
import { RESPONSE_STATUS } from '@constants/common.constants'
import { getPreSignedUrl, upload } from '@services/image.service'
import { UserProfile } from '@services/user.service'
import { CommunityResponse } from '@services/community.service'
import { Meta } from '@store/metadata/actions/types'

const useUserData = (
  raw_code: string | Array<string> | []
): {
  userCode: string
  profile: UserProfile
  isOthers: boolean
  meta: Meta
  communityList: CommunityResponse[]
  communityMeta: Meta
  getCommunityList: () => void
  getMemberProfile: (userCode: string) => void
  profileImageChange: (file: File, user_id: number, type: number) => void
} => {
  const authSelectors = auth.selectors
  const myUserCode = useAppSelector(authSelectors.getUserCode)
  const communitySelectors = community.selectors
  const communityActions = community.actions
  const getCommunityListMeta = createMetaSelector(communityActions.getCommunityList)
  const userSelectors = userProfileStore.selectors
  const userActions = userProfileStore.actions

  let isOthers = raw_code.length > 0
  let userCode = myUserCode
  if (isOthers && raw_code[0] === myUserCode) {
    isOthers = false
  }
  const dispatch = useAppDispatch()

  let meta = null
  let profile = null
  if (isOthers) {
    const getMemberMeta = createMetaSelector(userActions.getMemberProfile)
    userCode = raw_code[0]
    profile = useAppSelector(userSelectors.getLastSeenUserData)
    meta = useAppSelector(getMemberMeta)
  } else {
    const getUserMeta = createMetaSelector(userActions.getUserProfile)
    profile = useAppSelector(userSelectors.getUserProfile)
    meta = useAppSelector(getUserMeta)
  }
  const getMemberProfile = () => dispatch(userActions.getMemberProfile(userCode))
  const getCommunityList = () => dispatch(communityActions.getCommunityList())
  const communityList = useAppSelector(communitySelectors.getCommunityList)
  const communityMeta = useAppSelector(getCommunityListMeta)

  // const progressListener = (progress: number) => {
  //   console.log('progressListener ', progress)
  // }
  const profileImageChange = async (file: File, user_id: number, type: number) => {
    const params = {
      type: type,
      fileName: file.name,
      contentType: file.type,
      room: user_id,
      action_type: ACTION_TYPE.UPDATE,
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
          file_type: type === UPLOADER_TYPE.AVATAR ? UPLOADER_TYPE.USER_PROFILE : UPLOADER_TYPE.USER_COVER,
        }
        dispatch(userActions.profileImage(params))
      }
    } catch (error) {
      console.log('useUserData.tsx 44 getPreSignedUrl failed', error)
    }
  }
  // const resetCommunityMeta = () => dispatch(clearMetaData(communityActions.getCommunityList.typePrefix))
  // const resetUserMeta = () => dispatch(clearMetaData(userActions.getMemberProfile.typePrefix))
  return {
    userCode,
    profile,
    isOthers,
    meta,
    communityList,
    communityMeta,
    getCommunityList,
    getMemberProfile,
    profileImageChange,
  }
}

export default useUserData
