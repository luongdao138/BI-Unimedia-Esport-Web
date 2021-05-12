import { useAppSelector } from '@store/hooks'
import userProfileStore from '@store/userProfile'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useGetProfile = () => {
  const { selectors } = userProfileStore
  const userProfile = useAppSelector(selectors.getUserProfile)

  return { userProfile }
}

export default useGetProfile
