import { useAppSelector } from '@store/hooks'
import { createMetaSelector } from '@store/metadata/selectors'
import userProfileStore from '@store/userProfile'

const getUserProfileMetaSelector = createMetaSelector(userProfileStore.actions.getUserProfile)

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useGetProfile = () => {
  const { selectors } = userProfileStore
  const userProfile = useAppSelector(selectors.getUserProfile)
  const getUserProfileMeta = useAppSelector(getUserProfileMetaSelector)

  return { userProfile, getUserProfileMeta }
}

export default useGetProfile
