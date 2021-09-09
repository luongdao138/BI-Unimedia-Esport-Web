import { useAppSelector } from '@store/hooks'
import { getUserCode } from '@store/auth/selectors'

const useTopicHelper = (
  owner_code?: string
): {
  isOwner: boolean
} => {
  const user_code = useAppSelector(getUserCode)
  const isOwner = user_code === owner_code
  return {
    isOwner,
  }
}

export default useTopicHelper
