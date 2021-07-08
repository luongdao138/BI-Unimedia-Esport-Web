import { useAppDispatch, useAppSelector } from '@store/hooks'
import userProfile from '@store/userProfile'
import { createMetaSelector } from '@store/metadata/selectors'

const { selectors, actions } = userProfile
const getUpdateHomeSettingsMeta = createMetaSelector(actions.updateHomeSettings)

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useUserData = () => {
  const dispatch = useAppDispatch()

  const metaHomeSettings = useAppSelector(getUpdateHomeSettingsMeta)
  const recommendedUsers = useAppSelector(selectors.getRecommendations)
  const userProfile = useAppSelector(selectors.getUserProfile)
  const homeSettings = userProfile ? userProfile.attributes.home_settings : []

  const getUserProfile = () => dispatch(actions.getUserProfile())
  const getUserRecommendations = () => dispatch(actions.getRecommendations())

  return { recommendedUsers, getUserRecommendations, homeSettings, getUserProfile, metaHomeSettings }
}

export default useUserData
