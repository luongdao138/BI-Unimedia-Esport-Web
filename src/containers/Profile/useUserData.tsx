import { useAppDispatch, useAppSelector } from '@store/hooks'
import userProfileStore from '@store/userProfile'
import community from '@store/community'
import auth from '@store/auth'
import { createMetaSelector } from '@store/metadata/selectors'
// import { clearMetaData } from '@store/metadata/actions'
import { UPLOADER_TYPE } from '@constants/image.constants'
import { RESPONSE_STATUS } from '@constants/common.constants'
import { getAvatarPreSignedUrl, getCoverPreSignedUrl, upload } from '@services/image.service'
import { UserProfile } from '@services/user.service'
import { CommunityResponse } from '@services/community.service'
import { Meta } from '@store/metadata/actions/types'

const useUserData = (
  raw_code: string | null
): {
  userCode: string
  profile: UserProfile
  isOthers: boolean
  isAuthenticated: boolean
  meta: Meta
  communityList: CommunityResponse[]
  communityMeta: Meta
  getCommunityList: () => void
  getMemberProfile: (userCode: string) => void
  profileImageChange: (file: File, user_id: number, type: number, blob?: any) => void
  profileImageRemove: (path: string, file_type: number) => void
  setFollowState: () => void
  clearMemberProfile: () => void
} => {
  const authSelectors = auth.selectors
  const myUserCode = useAppSelector(authSelectors.getUserCode)
  const communitySelectors = community.selectors
  const communityActions = community.actions
  const getCommunityListMeta = createMetaSelector(communityActions.getCommunityList)
  const userSelectors = userProfileStore.selectors
  const userActions = userProfileStore.actions
  const isAuthenticated = useAppSelector(authSelectors.getIsAuthenticated)

  let isOthers = raw_code !== null
  let userCode = myUserCode
  if (isOthers && raw_code === myUserCode) {
    isOthers = false
  }
  const dispatch = useAppDispatch()

  let meta = null
  let profile = null
  if (isOthers) {
    const getMemberMeta = createMetaSelector(userActions.getMemberProfile)
    userCode = raw_code
    profile = useAppSelector(userSelectors.getLastSeenUserData)
    meta = useAppSelector(getMemberMeta)
  } else {
    const getUserMeta = createMetaSelector(userActions.getUserProfile)
    profile = useAppSelector(userSelectors.getUserProfile)
    meta = useAppSelector(getUserMeta)
  }
  const getMemberProfile = () => dispatch(userActions.getMemberProfile(userCode))
  const clearMemberProfile = () => dispatch(userActions.clearMemberProfile())
  const getCommunityList = () => dispatch(communityActions.getCommunityList())
  const communityList = useAppSelector(communitySelectors.getCommunityList)
  const communityMeta = useAppSelector(getCommunityListMeta)

  // const progressListener = (progress: number) => {
  //   console.log('progressListener ', progress)
  // }
  const profileImageChange = async (file: File, type: number, blob?: any) => {
    const params = {
      file_name: file.name,
      content_type: file.type == 'image/gif' ? 'image/png' : file.type,
    }
    try {
      let res = null as any | null
      if (UPLOADER_TYPE.COVER) {
        res = await getCoverPreSignedUrl(params)
      } else {
        res = await getAvatarPreSignedUrl(params)
      }
      const file_url = res.file_url
      const signed_url = res.url
      const u_res = await upload(blob ? blob : file, signed_url, undefined)
      if (u_res === RESPONSE_STATUS.SUCCESS) {
        const params = {
          image_url: 'https://' + file_url,
          file_type: type === UPLOADER_TYPE.AVATAR ? UPLOADER_TYPE.USER_PROFILE : UPLOADER_TYPE.USER_COVER,
        }
        dispatch(userActions.profileImage(params))
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log('useUserData.tsx 44 getPreSignedUrl failed', error)
    }
  }

  const profileImageRemove = async (path: string, file_type: number) => {
    const params = {
      path: path,
      file_type: file_type,
    }
    try {
      dispatch(userActions.profileImageRemove(params))
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log('useUserData.tsx profileImageRemove failed', error)
    }
  }

  const setFollowState = async () => {
    if (profile) {
      const params = { user_code: userCode }
      if (profile.attributes?.is_following) {
        dispatch(userActions.unfollow(params))
      } else {
        dispatch(userActions.follow(params))
      }
    }
  }
  // const resetCommunityMeta = () => dispatch(clearMetaData(communityActions.getCommunityList.typePrefix))
  // const resetUserMeta = () => dispatch(clearMetaData(userActions.getMemberProfile.typePrefix))
  return {
    userCode,
    profile,
    isOthers,
    isAuthenticated,
    meta,
    communityList,
    communityMeta,
    getCommunityList,
    getMemberProfile,
    profileImageChange,
    profileImageRemove,
    setFollowState,
    clearMemberProfile,
  }
}

export default useUserData
